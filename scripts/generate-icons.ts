// Favicons and app icons drawn from the logo grid.
// Run with: node scripts/generate-icons.ts
import sharp from 'sharp'
import { writeFile } from 'fs/promises'
import { LOGO_MARK } from '../src/components/pixel/mark.ts'

// Colors match the tokens in src/index.css. Ink boxes turn light so the
// mark reads on the dark tile.
const TILE = '#121216'
const COLORS: Record<string, string> = {
  k: '#E7E7EE',
  p: '#7B4AE2',
  b: '#2D8CF0',
  o: '#FF8B1E',
}

const MARK_SIZE = LOGO_MARK.length

/** An icon `size` px square with the mark drawn at `cell` px per box, centered. */
function iconSvg(size: number, cell: number) {
  const offset = Math.floor((size - MARK_SIZE * cell) / 2)
  const paths = Object.entries(COLORS).map(([key, fill]) => {
    const d = LOGO_MARK.flatMap((row, y) =>
      [...row].flatMap((ch, x) =>
        ch === key ? [`M${offset + x * cell} ${offset + y * cell}h${cell}v${cell}h-${cell}z`] : [],
      ),
    ).join('')
    return `<path fill="${fill}" d="${d}"/>`
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="${TILE}"/>${paths.join('')}</svg>\n`
}

const png = (size: number, cell: number) => sharp(Buffer.from(iconSvg(size, cell))).png().toBuffer()

/** ICO container holding PNG-compressed images */
function ico(images: { size: number; data: Buffer }[]) {
  const header = Buffer.alloc(6 + images.length * 16)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = header.length
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16
    header.writeUInt8(size >= 256 ? 0 : size, entry)
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1)
    header.writeUInt8(0, entry + 2)
    header.writeUInt8(0, entry + 3)
    header.writeUInt16LE(1, entry + 4)
    header.writeUInt16LE(32, entry + 6)
    header.writeUInt32LE(data.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += data.length
  })
  return Buffer.concat([header, ...images.map((image) => image.data)])
}

// Whole-pixel boxes at every size: 9 boxes × cell, centered on the tile
await writeFile('public/favicon.svg', iconSvg(11, 1))
await writeFile(
  'public/favicon.ico',
  ico([
    { size: 16, data: await png(16, 1) },
    { size: 32, data: await png(32, 3) },
    { size: 48, data: await png(48, 5) },
  ]),
)
await sharp(await png(180, 18)).toFile('public/icons/apple-touch-icon-180x180.png')
await sharp(await png(192, 18)).toFile('public/icons/pwa-192x192.png')
await sharp(await png(512, 50)).toFile('public/icons/pwa-512x512.png')
// Maskable: keep the mark inside the central safe circle
await sharp(await png(512, 34)).toFile('public/icons/maskable-512x512.png')

console.log('✓ favicon.svg, favicon.ico, apple-touch, pwa and maskable icons')
