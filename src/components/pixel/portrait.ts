import type { Box } from "./path"

// The portrait silhouette sampled at 28×22, darkness 0 (empty) to 5 (solid).
const PORTRAIT = [
  "0000000000003333110000000000",
  "0000000000245555442000000000",
  "0000000001555555554000000000",
  "0000000003555555553000000000",
  "0000000004555555553000000000",
  "0000000004555555554100000000",
  "0000000004555555554100000000",
  "0000000002555555554000000000",
  "0000000000455555555100000000",
  "0000000000254555554000000000",
  "0000000000035555554000000000",
  "0000000000025555552000000000",
  "0000000000035555441000000000",
  "0000000000145554311000000000",
  "0000000012455555432210000000",
  "0000001234455555433433100000",
  "0000023444445554444443410000",
  "0000244454555555444444420000",
  "0001454444555555454444431000",
  "0002555544555555454454541000",
  "0003555545555555455455542000",
  "0014555555555555455555543000",
]

/** Extra rows that dissolve the flat bottom edge of the sample */
const FADE_ROWS = 5
const SCALE = [0, 0.3, 0.46, 0.62, 0.8, 0.94]

function noise(x: number, y: number, salt = 0) {
  const s = Math.sin(x * 127.1 + y * 311.7 + salt * 74.7) * 43758.5453
  return s - Math.floor(s)
}

const grid = PORTRAIT.map((row) => Array.from(row, Number))
const sampled = grid.length

// Break up the last sampled rows so the dissolve starts above the edge
for (let y = sampled - 3; y < sampled; y++) {
  grid[y] = grid[y].map((v, x) => (v >= 4 && noise(x, y, 1) < 0.22 ? v - 1 - Math.round(noise(x, y, 2)) : v))
}

// Fade out below the sample: fewer and smaller dots each row, spreading a little sideways
for (let k = 1; k <= FADE_ROWS; k++) {
  const above = grid[grid.length - 1]
  const y = grid.length
  const keep = Math.pow(1 - k / (FADE_ROWS + 1), 1.3)
  grid.push(
    above.map((_, x) => {
      const base = Math.max(above[x], (above[x - 1] ?? 0) - 1, (above[x + 1] ?? 0) - 1)
      if (base <= 0 || noise(x, y) > keep) return 0
      return Math.min(5, Math.max(1, Math.round(base * keep * (0.6 + noise(x, y, 3) * 0.8))))
    }),
  )
}

// Stray dots bleeding off the silhouette
const filled = (x: number, y: number) => (grid[y]?.[x] ?? 0) > 0
const strays: [number, number, number][] = []
grid.forEach((row, y) =>
  row.forEach((v, x) => {
    if (v) return
    let near = 0
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (filled(x + dx, y + dy)) near++
    if (near > 0 && noise(x, y, 4) < 0.05 + near * 0.012) strays.push([x, y, noise(x, y, 5) < 0.75 ? 1 : 2])
  }),
)
strays.forEach(([x, y, v]) => (grid[y][x] = v))

export const PORTRAIT_COLS = 28
export const PORTRAIT_ROWS = grid.length

export const PORTRAIT_DOTS: Box[] = grid.flatMap((row, y) =>
  row.flatMap((v, x) => {
    const s = SCALE[v]
    if (!s) return []
    // Nudge about one dot in five off the grid
    const jitter = noise(x, y, 6) < 0.2
    const dx = jitter ? (noise(x, y, 7) - 0.5) * 0.3 : 0
    const dy = jitter ? (noise(x, y, 8) - 0.5) * 0.3 : 0
    return [{ x: x + (1 - s) / 2 + dx, y: y + (1 - s) / 2 + dy, w: s }]
  }),
)
