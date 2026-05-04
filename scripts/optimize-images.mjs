import sharp from 'sharp'
import { readdir, stat, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'
import { spawn } from 'child_process'

const IMAGES_DIR = 'public/images'
const QUALITY = 80
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg']
const VIDEO_EXTENSIONS = ['.mp4']

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    const extension = extname(entry.name).toLowerCase()
    if (entry.isDirectory()) {
      files.push(...(await getFiles(path)))
    } else if ([...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS].includes(extension)) {
      files.push(path)
    }
  }
  return files
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let errorOutput = ''

    ffmpeg.stderr.on('data', (chunk) => {
      errorOutput += chunk
    })

    ffmpeg.on('error', (error) => {
      if (error.code === 'ENOENT') {
        reject(new Error('ffmpeg is required to convert MP4 files to WebM. Install ffmpeg and try again.'))
        return
      }

      reject(error)
    })

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`ffmpeg failed with exit code ${code}:\n${errorOutput.trim()}`))
    })
  })
}

async function convertImage(file) {
  const webpPath = file.replace(/\.(png|jpe?g)$/i, '.webp')
  const originalSize = (await stat(file)).size

  await sharp(file).webp({ quality: QUALITY }).toFile(webpPath)

  const newSize = (await stat(webpPath)).size
  const saved = ((1 - newSize / originalSize) * 100).toFixed(1)

  await unlink(file)

  console.log(`${basename(file)} → ${basename(webpPath)}  ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB  (${saved}% smaller)`)
}

async function convertVideo(file) {
  const webmPath = file.replace(/\.mp4$/i, '.webm')
  const originalSize = (await stat(file)).size

  await runFfmpeg([
    '-y',
    '-i',
    file,
    '-c:v',
    'libvpx-vp9',
    '-crf',
    '32',
    '-b:v',
    '0',
    '-c:a',
    'libopus',
    webmPath,
  ])

  const newSize = (await stat(webmPath)).size
  const saved = ((1 - newSize / originalSize) * 100).toFixed(1)

  await unlink(file)

  console.log(`${basename(file)} → ${basename(webmPath)}  ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB  (${saved}% smaller)`)
}

async function convert(file) {
  const extension = extname(file).toLowerCase()

  if (IMAGE_EXTENSIONS.includes(extension)) {
    await convertImage(file)
    return
  }

  if (VIDEO_EXTENSIONS.includes(extension)) {
    await convertVideo(file)
  }
}

const files = await getFiles(IMAGES_DIR)
const imageCount = files.filter((file) => IMAGE_EXTENSIONS.includes(extname(file).toLowerCase())).length
const videoCount = files.filter((file) => VIDEO_EXTENSIONS.includes(extname(file).toLowerCase())).length

console.log(`Converting ${imageCount} images to WebP and ${videoCount} MP4 videos to WebM...\n`)

await Promise.all(files.map(convert))

console.log('\nDone!')
