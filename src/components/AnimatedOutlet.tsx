import { useState } from "react"
import { useLocation, useOutlet } from "react-router"
import { PixelCurtain } from "./pixel"

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
      <div>{active ? displayedOutlet : outlet}</div>

      {active && (
        <PixelCurtain
          key={transitionCount}
          onCovered={() => {
            setDisplayedOutlet(pendingOutlet)
            // Wait for the new page to render, then jump to its anchor or the top
            requestAnimationFrame(() => {
              const target = location.hash && document.getElementById(location.hash.slice(1))
              if (target) target.scrollIntoView({ behavior: "instant" })
              else window.scrollTo({ top: 0, behavior: "instant" })
            })
          }}
          onDone={() => {
            setActive(false)
          }}
        />
      )}
    </div>
  )
}
