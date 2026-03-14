import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const size = useMotionValue(12)

  // Smooth spring-based following
  const springX = useSpring(cursorX, { damping: 25, stiffness: 250, mass: 0.5 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250, mass: 0.5 })
  const springSize = useSpring(size, { damping: 20, stiffness: 300 })

  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1"
    }

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0"
    }

    const onHoverIn = () => size.set(48)
    const onHoverOut = () => size.set(12)

    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .hover-lift"
      )
      targets.forEach((el) => {
        el.addEventListener("mouseenter", onHoverIn)
        el.addEventListener("mouseleave", onHoverOut)
      })
      return targets
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseleave", onLeave)

    let targets = addHoverListeners()

    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn)
        el.removeEventListener("mouseleave", onHoverOut)
      })
      targets = addHoverListeners()

      // Check if cursor is still over an interactive element
      const hoveredEl = document.elementFromPoint(cursorX.get(), cursorY.get())
      const isOverInteractive = hoveredEl?.closest(
        "a, button, [role='button'], input, textarea, select, .hover-lift"
      )
      size.set(isOverInteractive ? 48 : 12)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseleave", onLeave)
      observer.disconnect()
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn)
        el.removeEventListener("mouseleave", onHoverOut)
      })
    }
  }, [cursorX, cursorY, size])

  return (
    <motion.div
      ref={dotRef}
      className="cursor-dot"
      style={{
        x: springX,
        y: springY,
        width: springSize,
        height: springSize,
        opacity: 0,
      }}
    />
  )
}
