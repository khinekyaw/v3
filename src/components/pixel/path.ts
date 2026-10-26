export interface Box {
  x: number
  y: number
  w?: number
  h?: number
}

const n = (v: number) => Number(v.toFixed(3))

/** Many boxes as one SVG path, so a sprite is one element instead of dozens. */
export function boxesPath(boxes: Box[]) {
  return boxes
    .map(({ x, y, w = 1, h = w }) => `M${n(x)} ${n(y)}h${n(w)}v${n(h)}h${n(-w)}z`)
    .join("")
}
