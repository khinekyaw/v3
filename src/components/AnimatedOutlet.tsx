import { useState, useEffect } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { useAnimate } from "motion/react"

const DURATION = 0.5

function PacmanCurtain({
  onCovered,
  onDone,
}: {
  onCovered: () => void
  onDone: () => void
}) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        // Phase 1: slide in (cover)
        await animate(
          scope.current,
          { x: "0%" },
          { duration: DURATION, ease: [0.4, 0, 0.2, 1] }
        )
        if (cancelled) return

        // Swap content under the curtain
        onCovered()

        // Wait for React to paint new content
        await new Promise((r) => requestAnimationFrame(r))
        await new Promise((r) => requestAnimationFrame(r))
        if (cancelled) return

        // Phase 2: slide out (reveal)
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
        {/* Curtain */}
        <div className="absolute inset-0 bg-background" />

        {/* Pacman */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <svg width="120" height="120" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" className="fill-foreground" />
            <circle cx="45" cy="22" r="5" className="fill-background" />
            <path d="M40 40 L80 28 L80 52 Z" className="fill-background transition-none">
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

export function AnimatedOutlet() {
  const location = useLocation()
  const outlet = useOutlet()

  const [displayedOutlet, setDisplayedOutlet] = useState(outlet)
  const [transitionCount, setTransitionCount] = useState(0)
  const [active, setActive] = useState(false)
  const [prevPath, setPrevPath] = useState(location.pathname)

  // Detect route change
  if (location.pathname !== prevPath && !active) {
    setPrevPath(location.pathname)
    setActive(true)
    setTransitionCount((c) => c + 1)
  }

  // Track latest outlet for swap
  const [pendingOutlet, setPendingOutlet] = useState(outlet)
  if (outlet !== pendingOutlet) {
    setPendingOutlet(outlet)
  }

  return (
    <div className="relative">
      <div>{displayedOutlet}</div>

      {active && (
        <PacmanCurtain
          key={transitionCount}
          onCovered={() => {
            setDisplayedOutlet(pendingOutlet)
            window.scrollTo(0, 0)
          }}
          onDone={() => {
            setActive(false)
          }}
        />
      )}
    </div>
  )
}
