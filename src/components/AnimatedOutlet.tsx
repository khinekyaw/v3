import { useState } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { PacmanCurtain } from "./PacmanCurtain"

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
