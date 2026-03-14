import sharp from 'sharp'
import { readdir, stat, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'

const IMAGES_DIR = 'public/images'
const QUALITY = 80

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getFiles(path)))
    } else if (['.png', '.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase())) {
      files.push(path)
    }
  }
  return files
}

async function convert(file) {
  const webpPath = file.replace(/\.(png|jpe?g)$/i, '.webp')
  const originalSize = (await stat(file)).size

  await sharp(file).webp({ quality: QUALITY }).toFile(webpPath)

  const newSize = (await stat(webpPath)).size
  const saved = ((1 - newSize / originalSize) * 100).toFixed(1)

  await unlink(file)

  console.log(`${basename(file)} → ${basename(webpPath)}  ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB  (${saved}% smaller)`)
}

const files = await getFiles(IMAGES_DIR)
console.log(`Converting ${files.length} images to WebP...\n`)

await Promise.all(files.map(convert))

console.log('\nDone!')
