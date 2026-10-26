import { useEffect, useState } from "react"
import { PixelText } from "./PixelText"

interface ScrambleTextProps {
  words: string[]
  size?: string
  className?: string
  /** Milliseconds each word stays on screen */
  interval?: number
}

const FRAMES = 9

/** Cycles through words, rebuilding each one from flickering boxes. */
export function ScrambleText({ words, size, className, interval = 2600 }: ScrambleTextProps) {
  const [state, setState] = useState({ index: 0, frame: 0, seed: 1 })

  useEffect(() => {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches
    let scramble: number | undefined

    const timer = window.setInterval(() => {
      setState((s) => ({
        index: (s.index + 1) % words.length,
        frame: reduceMotion ? 0 : 1,
        seed: Math.floor(Math.random() * 2 ** 31),
      }))
      if (reduceMotion) return
      let frame = 1
      window.clearInterval(scramble)
      scramble = window.setInterval(() => {
        frame += 1
        if (frame >= FRAMES) window.clearInterval(scramble)
        setState((s) => ({ ...s, frame: frame >= FRAMES ? 0 : frame, seed: (s.seed * 16807) % 2147483647 }))
      }, 55)
    }, interval)

    return () => {
      window.clearInterval(timer)
      window.clearInterval(scramble)
    }
  }, [words.length, interval])

  return (
    <PixelText
      text={words[state.index]}
      size={size}
      className={className}
      noise={state.frame}
      noiseSeed={state.seed}
      label={false}
    />
  )
}
