import sharp from 'sharp'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'

// Pixel cursors drawn from a grid, written as SVG (crisp at any density)
// plus a PNG fallback. Colors match the tokens in src/index.css.
const OUT_DIR = 'public/cursors'
const CELL = 2 // px per box; 9×15 boxes stays within 32px

const INK = '#121216'
const PAPER = '#E7E7EE'
const ORANGE = '#FF8B1E'

// B = outline, W = fill
const ARROW = [
  'B........',
  'BB.......',
  'BWB......',
  'BWWB.....',
  'BWWWB....',
  'BWWWWB...',
  'BWWWWWB..',
  'BWWWWWWB.',
  'BWWWWBBBB',
  'BWBWWB...',
  'BB.BWWB..',
  '...BWWB..',
  '....BWWB.',
  '....BWWB.',
  '.....BB..',
]

const CURSORS = {
  arrow: { outline: INK, fill: PAPER },
  pointer: { outline: INK, fill: ORANGE },
  // Dark theme: light outline so the edge stays visible on ink
  'arrow-dark': { outline: PAPER, fill: INK },
  'pointer-dark': { outline: PAPER, fill: ORANGE },
}

const boxes = (cells) => cells.map(([x, y]) => `M${x} ${y}h1v1h-1z`).join('')

function cursorSvg({ outline, fill }) {
  const outlines = []
  const fills = []
  ARROW.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === 'B') outlines.push([x, y])
      if (ch === 'W') fills.push([x, y])
    }),
  )
  const width = ARROW[0].length
  const height = ARROW.length
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width * CELL}" height="${height * CELL}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges"><path fill="${outline}" d="${boxes(outlines)}"/><path fill="${fill}" d="${boxes(fills)}"/></svg>\n`
}

await mkdir(OUT_DIR, { recursive: true })
for (const [name, colors] of Object.entries(CURSORS)) {
  const svg = cursorSvg(colors)
  await writeFile(join(OUT_DIR, `${name}.svg`), svg)
  await sharp(Buffer.from(svg)).png().toFile(join(OUT_DIR, `${name}.png`))
  console.log(`✓ ${OUT_DIR}/${name}.svg + .png`)
}
