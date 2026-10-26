import type { CSSProperties } from "react"
import { cn } from "../../lib/utils"
import { boxesPath } from "./path"
import { PORTRAIT_COLS, PORTRAIT_DOTS, PORTRAIT_ROWS } from "./portrait"

const D = boxesPath(PORTRAIT_DOTS)

interface HalftoneProps {
  /** Size of one dot cell, any CSS length */
  cell: string
  className?: string
  style?: CSSProperties
}

/** Halftone portrait: every dot is a square sized by darkness. */
export function Halftone({ cell, className, style }: HalftoneProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${PORTRAIT_COLS} ${PORTRAIT_ROWS}`}
      shapeRendering="crispEdges"
      className={cn("overflow-visible", className)}
      style={{ width: `calc(${cell} * ${PORTRAIT_COLS})`, height: `calc(${cell} * ${PORTRAIT_ROWS})`, ...style }}
    >
      <path d={D} fill="currentColor" />
    </svg>
  )
}
