import { cn } from "../../lib/utils"
import { hashString, mulberry32 } from "./font"
import { boxesPath } from "./path"

interface IdenticonProps {
  seed: string
  /** Grid size (boxes per side) */
  size?: number
  /** Size of one box, any CSS length */
  cell?: string
  /** Color of the main boxes */
  color?: string
  /** Color of the secondary boxes */
  altColor?: string
  className?: string
}

/** A mirrored box pattern generated from a string, one per project. */
export function Identicon({
  seed,
  size = 8,
  cell = "16px",
  color = "var(--color-night)",
  altColor = "var(--color-night-foreground)",
  className,
}: IdenticonProps) {
  const rand = mulberry32(hashString(seed))
  const half = Math.ceil(size / 2)
  const cells: { x: number; y: number; alt: boolean }[] = []

  for (let y = 0; y < size; y++) {
    const row: (boolean | null)[] = []
    for (let x = 0; x < half; x++) {
      const v = rand()
      row.push(v < 0.5 ? false : v < 0.62 ? true : null)
    }
    const full = row.concat(row.slice(0, size - half).reverse())
    full.forEach((alt, x) => {
      if (alt !== null) cells.push({ x, y, alt })
    })
  }

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${size} ${size}`}
      shapeRendering="crispEdges"
      className={cn("block shrink-0", className)}
      style={{ width: `calc(${cell} * ${size})`, height: `calc(${cell} * ${size})` }}
    >
      <path d={boxesPath(cells.filter((c) => !c.alt))} fill={color} />
      <path d={boxesPath(cells.filter((c) => c.alt))} fill={altColor} />
    </svg>
  )
}
