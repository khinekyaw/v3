import type { CSSProperties } from "react"
import { cn } from "../../lib/utils"
import { LOGO_MARK } from "./mark"
import { PIXEL_COLORS } from "./sprites"

const CELLS = LOGO_MARK.flatMap((row, y) =>
  Array.from(row).flatMap((ch, x) => {
    if (ch === ".") return []
    const pop = (0.04 * ((x * 7 + y * 3) % 11)).toFixed(2)
    const glint = (1.4 + (x + 8 - y) * 0.045).toFixed(2)
    return [{ x, y, ch, delay: `${pop}s, ${glint}s` }]
  }),
)

interface LogoMarkProps {
  /** Size of one box in px */
  cell?: number
  /** Color for the ink boxes (defaults to the foreground token) */
  ink?: string
  className?: string
}

export function LogoMark({ cell = 5, ink, className }: LogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 9 9"
      width={cell * 9}
      height={cell * 9}
      shapeRendering="crispEdges"
      className={cn("block shrink-0 overflow-visible", className)}
    >
      {CELLS.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          className="glint-cell"
          x={c.x}
          y={c.y}
          width={1}
          height={1}
          style={
            {
              "--col": c.ch === "k" && ink ? ink : PIXEL_COLORS[c.ch],
              animationDelay: c.delay,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  )
}
