import { useEffect, useMemo } from "react"
import { useAnimate } from "motion/react"

const DURATION = 0.5

function getComputedColor(varName: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

export function PacmanCurtain({
  onCovered,
  onDone,
  inverted = false,
}: {
  onCovered: () => void
  onDone: () => void
  inverted?: boolean
}) {
  const [scope, animate] = useAnimate()

  // Snapshot colors at mount so they don't change when the theme swaps
  const colors = useMemo(() => {
    const fg = getComputedColor("--color-primary")
    const bg = getComputedColor("--color-background")
    return {
      curtain: inverted ? fg : bg,
      pacman: inverted ? bg : fg,
      mouth: inverted ? fg : bg,
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        await animate(
          scope.current,
          { x: "0%" },
          { duration: DURATION, ease: [0.4, 0, 0.2, 1] }
        )
        if (cancelled) return

        onCovered()

        await new Promise((r) => requestAnimationFrame(r))
        await new Promise((r) => requestAnimationFrame(r))
        if (cancelled) return

        await animate(
          scope.current,
          { x: "100%" },
          { duration: DURATION, ease: [0.4, 0, 0.2, 1] }
        )
        if (cancelled) return

        onDone()
      } catch {
        // Animation interrupted
      }
    }

    run()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <div
        ref={scope}
        className="absolute top-0 left-0 w-full h-full"
        style={{ transform: "translateX(-100%)" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: colors.curtain }} />

        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <svg width="120" height="120" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill={colors.pacman} />
            <circle cx="45" cy="22" r="5" fill={colors.mouth} />
            <path d="M40 40 L80 28 L80 52 Z" fill={colors.mouth}>
              <animate
                attributeName="d"
                dur="0.3s"
                repeatCount="indefinite"
                values="
                  M40 40 L80 20 L80 60 Z;
                  M40 40 L80 37 L80 43 Z;
                  M40 40 L80 20 L80 60 Z
                "
              />
            </path>
          </svg>
        </div>
      </div>
    </div>
  )
}
