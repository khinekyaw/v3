import type { CSSProperties } from "react"
import { cn } from "../../lib/utils"
import { boxesPath, type Box } from "./path"
import { PIXEL_COLORS, SPRITES, type SpriteName } from "./sprites"

interface PixelSpriteProps {
  name: SpriteName
  /** Fill for "x" boxes; defaults to currentColor */
  color?: string
  /** Size of one box, any CSS length */
  cell?: string
  className?: string
  style?: CSSProperties
}

export function PixelSprite({ name, color = "currentColor", cell = "6px", className, style }: PixelSpriteProps) {
  const rows = SPRITES[name]
  const width = rows[0].length
  const height = rows.length

  const byColor = new Map<string, Box[]>()
  rows.forEach((row, y) =>
    Array.from(row).forEach((ch, x) => {
      if (ch === ".") return
      const fill = ch === "x" ? color : PIXEL_COLORS[ch]
      byColor.set(fill, [...(byColor.get(fill) ?? []), { x, y }])
    }),
  )

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      className={cn("block shrink-0", className)}
      style={{ width: `calc(${cell} * ${width})`, height: `calc(${cell} * ${height})`, ...style }}
    >
      {[...byColor].map(([fill, boxes]) => (
        <path key={fill} d={boxesPath(boxes)} fill={fill} />
      ))}
    </svg>
  )
}
