import { useEffect, useState } from "react"
import { mulberry32 } from "./font"

interface PixelCurtainProps {
  /** Called once the screen is fully covered */
  onCovered: () => void
  /** Called after the boxes have cleared again */
  onDone: () => void
}

const COLS = 16
const ROWS = 10
const PHASE_MS = 420

const COLORS = [
  "var(--color-night)",
  "var(--color-night)",
  "var(--color-night)",
  "var(--color-pixel-blue)",
  "var(--color-pixel-purple)",
  "var(--color-pixel-orange)",
]

const rand = mulberry32(7)
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const x = i % COLS
  const y = Math.floor(i / COLS)
  const order = (x + (ROWS - 1 - y)) / (COLS + ROWS - 2)
  return {
    color: COLORS[Math.floor(rand() * COLORS.length)],
    delay: Math.round((order * 0.7 + rand() * 0.3) * (PHASE_MS - 120)),
  }
})

/** Full-screen wipe made of boxes, used for page and theme transitions. */
export function PixelCurtain({ onCovered, onDone }: PixelCurtainProps) {
  const [phase, setPhase] = useState<"cover" | "reveal">("cover")

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onCovered()
      onDone()
      return
    }
    const covered = window.setTimeout(() => {
      onCovered()
      setPhase("reveal")
    }, PHASE_MS + 60)
    const done = window.setTimeout(onDone, PHASE_MS * 2 + 120)
    return () => {
      window.clearTimeout(covered)
      window.clearTimeout(done)
    }
    // Callbacks are fired once per curtain; the parent remounts it with a key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-100 grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {CELLS.map((c, i) => (
        <span
          key={i}
          className="block"
          style={{
            backgroundColor: c.color,
            // Slight overlap hides hairline gaps between boxes
            margin: "-0.5px",
            animation:
              phase === "cover"
                ? `pop 120ms steps(2) ${c.delay}ms both`
                : `unpop 120ms steps(2) ${PHASE_MS - 120 - c.delay}ms both`,
          }}
        />
      ))}
    </div>
  )
}
