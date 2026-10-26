// Social preview cards (1200×630) drawn entirely from boxes: the diagonal
// band, a few sprites, the logo and text in the site's 5×7 pixel font.
// No fonts are needed to render them.
import sharp from 'sharp'
import { GLYPH_HEIGHT, glyph } from '../src/components/pixel/font.ts'
import { LOGO_MARK } from '../src/components/pixel/mark.ts'
import { SPRITES, type SpriteName } from '../src/components/pixel/sprites.ts'

export interface OgCard {
  kicker: string
  title: string
  subtitle?: string
}

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

// Colors match the tokens in src/index.css
const INK = '#121216'
const PAPER = '#E7E7EE'
const MUTE = '#50516A'
const DOT = '#B9BAC8'
const PALETTE: Record<string, string> = {
  k: INK,
  b: '#2D8CF0',
  p: '#7B4AE2',
  o: '#FF8B1E',
  y: '#F7E06A',
  m: '#DA4DB6',
}

const PAD = 64
const TEXT_WIDTH = 620
const CELL = 15 // band box size: 80 × 42 boxes
const COLS = OG_WIDTH / CELL
const ROWS = OG_HEIGHT / CELL
const BAND_CENTER = 88

interface Box {
  x: number
  y: number
  w: number
  h: number
}

const pathOf = (boxes: Box[]) => boxes.map((b) => `M${b.x} ${b.y}h${b.w}v${b.h}h${-b.w}z`).join('')
const fill = (color: string, boxes: Box[]) => (boxes.length ? `<path fill="${color}" d="${pathOf(boxes)}"/>` : '')

// ── Text ───────────────────────────────────────────────────────────────

function textWidth(text: string, box: number) {
  const chars = [...text]
  return chars.reduce((w, ch) => w + glyph(ch)[0].length * box, 0) + Math.max(0, chars.length - 1) * box
}

function textBoxes(text: string, box: number, x0: number, y0: number) {
  const boxes: Box[] = []
  let x = x0
  for (const ch of text) {
    const rows = glyph(ch)
    rows.forEach((row, y) => {
      let i = 0
      while (i < row.length) {
        if (row[i] !== '#') {
          i++
          continue
        }
        let n = 1
        while (row[i + n] === '#') n++
        boxes.push({ x: x + i * box, y: y0 + y * box, w: n * box, h: box })
        i += n
      }
    })
    x += (rows[0].length + 1) * box
  }
  return boxes
}

/** Greedy word wrap; null when a single word is wider than the line */
function wrap(text: string, box: number, maxWidth: number) {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/ +/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word
    if (textWidth(next, box) <= maxWidth) {
      line = next
    } else {
      if (!line || textWidth(word, box) > maxWidth) return null
      lines.push(line)
      line = word
    }
  }
  if (line) lines.push(line)
  return lines
}

/** Trim to `maxLines`, ending the last line with an ellipsis when cut */
function clampLines(lines: string[], box: number, maxWidth: number, maxLines: number) {
  if (lines.length <= maxLines) return lines
  const kept = lines.slice(0, maxLines)
  let last = `${kept[maxLines - 1]}...`
  while (textWidth(last, box) > maxWidth && last.includes(' ')) {
    last = `${last.slice(0, last.lastIndexOf(' ', last.length - 4))}...`
  }
  kept[maxLines - 1] = last
  return kept
}

const TITLE_SIZES = [16, 14, 12, 11, 10, 9, 8, 7, 6]
const TITLE_LINE_GAP = 2.4 // in boxes
const TITLE_TOP = 250
const SUB_BOX = 4
const SUB_WIDTH = 560
const SUB_LINE = GLYPH_HEIGHT * SUB_BOX + 16
const FOOTER_TOP = 562
const GAP = 30

const titleHeight = (lines: number, box: number) => lines * GLYPH_HEIGHT * box + (lines - 1) * TITLE_LINE_GAP * box
const subtitleHeight = (lines: number) => (lines ? lines * SUB_LINE - 16 + GAP : 0)

/**
 * Largest title size that fits above the footer. Subtitle lines give way
 * first (2, then 1, then none) before the title is truncated.
 */
function layoutText(title: string, subtitle?: string) {
  const allSubLines = subtitle ? (wrap(subtitle, SUB_BOX, SUB_WIDTH) ?? [subtitle]) : []
  for (let keep = Math.min(2, allSubLines.length); keep >= 0; keep--) {
    const maxHeight = FOOTER_TOP - GAP - subtitleHeight(keep) - TITLE_TOP
    for (const box of TITLE_SIZES) {
      const lines = wrap(title, box, TEXT_WIDTH)
      if (lines && titleHeight(lines.length, box) <= maxHeight) {
        return { box, lines, subLines: clampLines(allSubLines, SUB_BOX, SUB_WIDTH, keep) }
      }
    }
  }
  const box = TITLE_SIZES[TITLE_SIZES.length - 1]
  const maxLines = Math.floor((FOOTER_TOP - GAP - TITLE_TOP + TITLE_LINE_GAP * box) / ((GLYPH_HEIGHT + TITLE_LINE_GAP) * box))
  return { box, lines: clampLines(wrap(title, box, TEXT_WIDTH) ?? [title], box, TEXT_WIDTH, maxLines), subLines: [] }
}

// ── Scenery ────────────────────────────────────────────────────────────

function hash(x: number, y: number) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return s - Math.floor(s)
}

/** The same diagonal band as the hero, on an 80 × 42 grid */
function bandBoxes() {
  const byInk: Record<string, Box[]> = { k: [], b: [], p: [], o: [], y: [] }
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const d = x + y - BAND_CENTER
      const r = hash(x, y)
      let ink: string | null = null
      if (d >= -11 && d <= -9) ink = d === -11 && r < 0.35 ? null : 'p'
      else if (d >= -8 && d <= 4) ink = r < 0.06 ? 'p' : r > 0.985 ? 'y' : 'b'
      else if (d === 5 || d === 6) ink = r < 0.1 ? 'b' : 'p'
      else if (d >= 7 && d <= 12) ink = d === 12 && r < 0.4 ? null : r > 0.975 ? 'o' : 'k'
      else if (d === -12 || d === -13) ink = r < (d === -12 ? 0.35 : 0.14) ? (r < 0.06 ? 'b' : 'p') : null
      else if (d === 13 || d === 14) ink = r < (d === 13 ? 0.35 : 0.12) ? 'k' : null
      else if (Math.abs(d) <= 17) ink = r < 0.045 ? ['p', 'b', 'o', 'k'][Math.floor(r * 1000) % 4] : null
      if (ink) byInk[ink].push({ x: x * CELL, y: y * CELL, w: CELL, h: CELL })
    }
  }
  return Object.entries(byInk).map(([ink, boxes]) => fill(PALETTE[ink], boxes)).join('')
}

const SPRITE_PLACEMENTS: { name: SpriteName; color?: string; x: number; y: number }[] = [
  { name: 'invader', color: 'b', x: 56, y: 3 },
  { name: 'plus', color: 'o', x: 49, y: 9 },
  { name: 'star', color: 'y', x: 64, y: 14 },
  { name: 'heart', color: 'm', x: 52, y: 33 },
  { name: 'coin', x: 70, y: 28 },
]

function spriteBoxes() {
  const half = CELL / 2
  return SPRITE_PLACEMENTS.map(({ name, color, x, y }) => {
    const byColor: Record<string, Box[]> = {}
    SPRITES[name].forEach((row, sy) =>
      [...row].forEach((ch, sx) => {
        if (ch === '.') return
        const c = PALETTE[ch === 'x' ? (color ?? 'k') : ch]
        ;(byColor[c] ??= []).push({ x: x * CELL + sx * half, y: y * CELL + sy * half, w: half, h: half })
      }),
    )
    return Object.entries(byColor).map(([c, boxes]) => fill(c, boxes)).join('')
  }).join('')
}

function logoBoxes(x0: number, y0: number, cell: number) {
  const byInk: Record<string, Box[]> = {}
  LOGO_MARK.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== '.') (byInk[ch] ??= []).push({ x: x0 + x * cell, y: y0 + y * cell, w: cell, h: cell })
    }),
  )
  return Object.entries(byInk).map(([ink, boxes]) => fill(PALETTE[ink], boxes)).join('')
}

// ── Card ───────────────────────────────────────────────────────────────

const SCENERY = bandBoxes() + spriteBoxes()

export function ogSvg({ kicker, title, subtitle }: OgCard) {
  const parts: string[] = []

  // Logo and name
  const logoCell = 6
  parts.push(logoBoxes(PAD, 56, logoCell))
  parts.push(fill(INK, textBoxes('KHINE KYAW TUN', 4, PAD + logoCell * 9 + 22, 56 + (logoCell * 9 - 28) / 2)))

  // Kicker: orange box + label
  parts.push(fill(PALETTE.o, [{ x: PAD, y: 196, w: 16, h: 16 }]))
  parts.push(fill(INK, textBoxes(kicker.toUpperCase(), 4, PAD + 30, 190)))

  const { box, lines, subLines } = layoutText(title.toUpperCase(), subtitle?.toUpperCase())

  // Title with the orange offset shadow used across the site
  const shadow = Math.max(2, Math.round(box * 0.35))
  let y = TITLE_TOP
  const titleBoxes: Box[] = []
  lines.forEach((line) => {
    titleBoxes.push(...textBoxes(line, box, PAD, y))
    y += GLYPH_HEIGHT * box + TITLE_LINE_GAP * box
  })
  const titleBottom = y - TITLE_LINE_GAP * box
  parts.push(fill(PALETTE.o, titleBoxes.map((b) => ({ ...b, x: b.x + shadow, y: b.y + shadow }))))
  parts.push(fill(INK, titleBoxes))

  subLines.forEach((line, i) => {
    parts.push(fill(MUTE, textBoxes(line, SUB_BOX, PAD, titleBottom + GAP + i * SUB_LINE)))
  })

  // Footer
  parts.push(fill(INK, textBoxes('KHINEKYAW.COM', 4, PAD, FOOTER_TOP)))

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" shape-rendering="crispEdges"><defs><pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="1.2" fill="${DOT}"/></pattern></defs><rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${PAPER}"/><rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#dots)"/>${SCENERY}${parts.join('')}</svg>`
}

export function renderOgImage(card: OgCard) {
  return sharp(Buffer.from(ogSvg(card))).png({ compressionLevel: 9, palette: true }).toBuffer()
}
