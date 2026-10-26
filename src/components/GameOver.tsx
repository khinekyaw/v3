import { useState, useEffect, useCallback, useRef } from "react"
import { Container, Section } from "./layout"
import { PixelSprite, PixelText } from "./pixel"
import { Button } from "./ui"

const GRID = 20
const COLS = 15
const ROWS = 15
const INITIAL_SNAKE = [{ x: 7, y: 7 }]
const INITIAL_DIR = { x: 1, y: 0 }

function randomDot(snake: { x: number; y: number }[]) {
  let dot: { x: number; y: number }
  do {
    dot = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some((s) => s.x === dot.x && s.y === dot.y))
  return dot
}

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [dot, setDot] = useState(() => randomDot(INITIAL_SNAKE))
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)
  const dirRef = useRef(INITIAL_DIR)
  const gameRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const reset = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setDot(randomDot(INITIAL_SNAKE))
    setScore(0)
    setGameOver(false)
    setStarted(false)
    dirRef.current = INITIAL_DIR
  }, [])

  const tick = useCallback(() => {
    setSnake((prev) => {
      const head = prev[0]
      const dir = dirRef.current
      const next = { x: head.x + dir.x, y: head.y + dir.y }

      // Wall collision
      if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
        setGameOver(true)
        return prev
      }

      // Self collision
      if (prev.some((s) => s.x === next.x && s.y === next.y)) {
        setGameOver(true)
        return prev
      }

      const newSnake = [next, ...prev]

      // Eat coin
      if (next.x === dot.x && next.y === dot.y) {
        setScore((s) => s + 1)
        setDot(randomDot(newSnake))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [dot])

  // Game loop
  useEffect(() => {
    if (!started || gameOver) return
    gameRef.current = setInterval(tick, 150)
    return () => clearInterval(gameRef.current)
  }, [started, gameOver, tick])

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"]
      if (!keys.includes(e.key)) return
      if (!started && !gameOver) {
        setStarted(true)
      }
      if (gameOver) return

      const dir = dirRef.current
      switch (e.key) {
        case "ArrowUp":
        case "w":
          e.preventDefault()
          if (dir.y !== 1) dirRef.current = { x: 0, y: -1 }
          break
        case "ArrowDown":
        case "s":
          e.preventDefault()
          if (dir.y !== -1) dirRef.current = { x: 0, y: 1 }
          break
        case "ArrowLeft":
        case "a":
          e.preventDefault()
          if (dir.x !== 1) dirRef.current = { x: -1, y: 0 }
          break
        case "ArrowRight":
        case "d":
          e.preventDefault()
          if (dir.x !== -1) dirRef.current = { x: 1, y: 0 }
          break
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [started, gameOver])

  // Touch/swipe controls
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!started && !gameOver) setStarted(true)
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }, [started, gameOver])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current || gameOver) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    const dir = dirRef.current

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20 && dir.x !== -1) dirRef.current = { x: 1, y: 0 }
      else if (dx < -20 && dir.x !== 1) dirRef.current = { x: -1, y: 0 }
    } else {
      if (dy > 20 && dir.y !== -1) dirRef.current = { x: 0, y: 1 }
      else if (dy < -20 && dir.y !== 1) dirRef.current = { x: 0, y: -1 }
    }
    touchStart.current = null
  }, [gameOver])

  const width = COLS * GRID
  const height = ROWS * GRID
  const head = snake[0]

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between font-pixel text-[13px] uppercase" style={{ maxWidth: width + 6 }}>
        <span className="text-foreground-secondary">
          Coins <span className="text-foreground">{String(score).padStart(3, "0")}</span>
        </span>
        {gameOver && (
          <button type="button" onClick={reset} className="min-h-11 text-foreground hover:text-pixel-orange">
            ▸ Play again
          </button>
        )}
      </div>

      <div
        className="dot-grid relative touch-none border-[3px] border-border bg-card shadow-[8px_8px_0_var(--color-border)]"
        style={{ width: width + 6, height: height + 6 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Coin */}
        <PixelSprite name="coin" cell="4px" className="absolute animate-coin" style={{ left: dot.x * GRID, top: dot.y * GRID }} />

        {/* Snake body */}
        {snake.slice(1).map((s, i) => (
          <div
            key={i}
            className="absolute bg-foreground"
            style={{ width: GRID - 2, height: GRID - 2, left: s.x * GRID + 1, top: s.y * GRID + 1 }}
          />
        ))}

        {/* Head */}
        <div className="absolute bg-pixel-orange" style={{ width: GRID, height: GRID, left: head.x * GRID, top: head.y * GRID }} />

        {/* Overlay messages */}
        {!started && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <p className="animate-blink font-pixel text-[13px] uppercase text-foreground">
              <span className="hidden md:inline">Press an arrow key</span>
              <span className="md:hidden">Swipe to start</span>
            </p>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <p className="font-pixel text-lg uppercase text-foreground">Game over</p>
          </div>
        )}
      </div>
    </div>
  )
}

/** The 404 screen: big box letters and a small game to pass the time. */
export function GameOver() {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <p className="mb-6 font-pixel text-[13px] uppercase text-foreground-secondary">Error 404 · Level not found</p>
        <h1 className="text-foreground" style={{ filter: "drop-shadow(6px 6px 0 var(--color-pixel-orange))" }}>
          <PixelText text="GAME OVER" size="clamp(5px, 1.3vw, 14px)" charClassName="animate-drop-in" stagger={0.06} />
        </h1>
        <p className="mt-8 mb-10 max-w-sm text-lg text-foreground-secondary">
          This page doesn't exist. While you're here, fancy collecting a few coins?
        </p>
        <div className="mb-12">
          <SnakeGame />
        </div>
        <Button to="/" variant="primary">
          ◂ Back to start
        </Button>
      </Container>
    </Section>
  )
}
