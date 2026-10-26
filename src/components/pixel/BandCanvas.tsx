import { useEffect, useRef } from "react"
import { useTheme } from "../../hooks/useTheme"
import { WORLD_COLS, WORLD_ROWS } from "./world"

type Ink = "k" | "b" | "p" | "o" | "y"

interface Cell {
  x: number
  y: number
  ink: Ink
  /** Seconds before the box pops in */
  delay: number
  /** Seconds before twinkling starts, or null for steady boxes */
  twinkle: number | null
}

const VARS: Record<Ink, string> = {
  k: "--foreground",
  b: "--pixel-blue",
  p: "--pixel-purple",
  o: "--pixel-orange",
  y: "--pixel-yellow",
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return s - Math.floor(s)
}

// The diagonal band: purple edge, blue core, purple stripe, ink shadow,
// with ragged edges and loose boxes scattered either side.
const CELLS: Cell[] = (() => {
  const cells: Cell[] = []
  for (let y = 0; y < WORLD_ROWS; y++) {
    for (let x = 0; x < WORLD_COLS; x++) {
      const d = x + y - 50
      const r = hash(x, y)
      let ink: Ink | null = null
      if (d >= -11 && d <= -9) ink = d === -11 && r < 0.35 ? null : "p"
      else if (d >= -8 && d <= 4) ink = r < 0.06 ? "p" : r > 0.985 ? "y" : "b"
      else if (d === 5 || d === 6) ink = r < 0.1 ? "b" : "p"
      else if (d >= 7 && d <= 12) ink = d === 12 && r < 0.4 ? null : r > 0.975 ? "o" : "k"
      else if (d === -12 || d === -13) ink = r < (d === -12 ? 0.35 : 0.14) ? (r < 0.06 ? "b" : "p") : null
      else if (d === 13 || d === 14) ink = r < (d === 13 ? 0.35 : 0.12) ? "k" : null
      else if (Math.abs(d) <= 17) ink = r < 0.045 ? (["p", "b", "o", "k"] as const)[Math.floor(r * 1000) % 4] : null
      if (!ink) continue
      const sparse = ink === "y" || ink === "o" || Math.abs(d) >= 13
      cells.push({
        x,
        y,
        ink,
        delay: ((x - y + 36) / 96) * 1.1,
        twinkle: sparse ? 1.4 + hash(y, x) * 2.6 : null,
      })
    }
  }
  return cells
})()

const POP = 0.3
const TWINKLE_PERIOD = 2.6
const BUILT_AT = Math.max(...CELLS.map((c) => c.delay)) + POP

/** Draws the band on one canvas instead of ~900 DOM boxes. */
export function BandCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Survives theme changes so switching colors does not replay the build-in
  const startRef = useRef<number | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const styles = getComputedStyle(document.documentElement)
    const colors = Object.fromEntries(
      Object.entries(VARS).map(([k, v]) => [k, styles.getPropertyValue(v).trim()]),
    ) as Record<Ink, string>
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches
    startRef.current ??= performance.now()
    const start = startRef.current

    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    let lastStep = -1

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      lastStep = -1
    }

    const draw = (t: number) => {
      const cell = width / WORLD_COLS
      ctx.clearRect(0, 0, width, height)
      for (const c of CELLS) {
        // Pop in with three hard steps
        const p = reduceMotion ? 1 : Math.min(1, Math.max(0, (t - c.delay) / POP))
        const scale = Math.ceil(p * 3) / 3
        if (scale <= 0) continue
        let alpha = 1
        if (c.twinkle !== null && !reduceMotion && t > c.twinkle) {
          const phase = ((t - c.twinkle) % TWINKLE_PERIOD) / TWINKLE_PERIOD
          if (phase >= 0.6 && phase < 0.8) alpha = 0.12
        }
        // Snap both edges of each box to whole pixels so neighbours always touch
        const x0 = Math.round(c.x * cell)
        const y0 = Math.round(c.y * cell)
        const w = Math.round((c.x + 1) * cell) - x0
        const h = Math.round((c.y + 1) * cell) - y0
        ctx.globalAlpha = alpha
        ctx.fillStyle = colors[c.ink]
        ctx.fillRect(x0 + (w * (1 - scale)) / 2, y0 + (h * (1 - scale)) / 2, w * scale, h * scale)
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      const t = (now - start) / 1000
      // Redraw at 12 steps per second once built; every frame while building
      const step = t < BUILT_AT ? Math.floor(t * 60) : Math.floor(t * 12)
      if (step !== lastStep) {
        lastStep = step
        draw(t)
      }
      if (visible) frame = requestAnimationFrame(loop)
    }

    resize()
    if (reduceMotion) {
      draw(BUILT_AT)
    } else {
      frame = requestAnimationFrame(loop)
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduceMotion) draw(BUILT_AT)
    })
    resizeObserver.observe(canvas)

    const intersection = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return
      const wasVisible = visible
      visible = entry.isIntersecting
      if (visible && !wasVisible) frame = requestAnimationFrame(loop)
    })
    intersection.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersection.disconnect()
    }
  }, [theme])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
