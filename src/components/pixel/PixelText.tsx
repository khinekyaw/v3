import type { CSSProperties } from "react"
import { cn } from "../../lib/utils"
import { GLYPH_HEIGHT, glyph, mulberry32 } from "./font"
import { boxesPath } from "./path"

interface PixelTextProps {
  text: string
  /** Size of one box, any CSS length */
  size?: string
  className?: string
  /** Class applied to every character (e.g. an entrance animation) */
  charClassName?: string
  /** Animation delay of the first character, in seconds */
  delay?: number
  /** Extra animation delay per character, in seconds */
  stagger?: number
  /** Scramble frame 1–8 (0 = clean). Boxes flicker in as the frame rises. */
  noise?: number
  noiseSeed?: number
  /** Render a visually hidden copy for screen readers (default true) */
  label?: boolean
}

interface Rect {
  x: number
  y: number
  w: number
  hot?: boolean
}

function cleanRects(rows: string[]): Rect[] {
  const rects: Rect[] = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      if (row[x] !== "#") {
        x++
        continue
      }
      let w = 1
      while (row[x + w] === "#") w++
      rects.push({ x, y, w })
      x += w
    }
  })
  return rects
}

function noisyRects(rows: string[], frame: number, rand: () => number): Rect[] {
  const progress = frame / 9
  const rects: Rect[] = []
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const r = rand()
      if (row[x] === "#") {
        if (r < 0.25 + progress * 0.75) rects.push({ x, y, w: 1 })
        else if (r < 0.92) rects.push({ x, y, w: 1, hot: true })
      } else if (r < 0.14 * (1 - progress)) {
        rects.push({ x, y, w: 1, hot: true })
      }
    }
  })
  return rects
}

/** Text drawn entirely from boxes. Color follows `currentColor`. */
export function PixelText({
  text,
  size = "8px",
  className,
  charClassName,
  delay = 0,
  stagger = 0,
  noise = 0,
  noiseSeed = 1,
  label = true,
}: PixelTextProps) {
  const rand = mulberry32(noiseSeed)

  return (
    <span
      className={cn("relative inline-flex items-start gap-(--s)", className)}
      style={{ "--s": size } as CSSProperties}
    >
      {label && <span className="sr-only">{text}</span>}
      {Array.from(text).map((char, i) => {
        const rows = glyph(char)
        const width = rows[0].length
        const rects = noise > 0 ? noisyRects(rows, noise, rand) : cleanRects(rows)
        return (
          <svg
            key={i}
            aria-hidden="true"
            viewBox={`0 0 ${width} ${GLYPH_HEIGHT}`}
            shapeRendering="crispEdges"
            className={cn("block shrink-0 overflow-visible", charClassName)}
            style={{
              width: `calc(var(--s) * ${width})`,
              height: `calc(var(--s) * ${GLYPH_HEIGHT})`,
              animationDelay: `${(delay + i * stagger).toFixed(2)}s`,
            }}
          >
            <path d={boxesPath(rects.filter((r) => !r.hot).map((r) => ({ ...r, h: 1 })))} fill="currentColor" />
            {noise > 0 && (
              <path d={boxesPath(rects.filter((r) => r.hot).map((r) => ({ ...r, h: 1 })))} fill="var(--color-pixel-orange)" />
            )}
          </svg>
        )
      })}
    </span>
  )
}
