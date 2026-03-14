import { useState, useEffect, useCallback, useRef } from "react"
import { Link } from "react-router-dom"
import { Container, Section } from "../components/layout"
import { Button } from "../components/ui"

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

function PacmanGame() {
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

      // Eat dot
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
  const dir = dirRef.current

  // Pacman mouth angle based on direction
  const rotation = dir.x === 1 ? 0 : dir.x === -1 ? 180 : dir.y === -1 ? 270 : 90

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full" style={{ maxWidth: width }}>
        <span className="text-sm font-medium text-foreground-secondary">
          Score: <span className="text-foreground font-bold">{score}</span>
        </span>
        {gameOver && (
          <button
            onClick={reset}
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors cursor-pointer"
          >
            Play Again
          </button>
        )}
      </div>

      <div
        className="relative rounded-xl border border-border overflow-hidden bg-secondary/50 touch-none"
        style={{ width, height }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Dot */}
        <div
          className="absolute rounded-full bg-accent"
          style={{
            width: GRID - 4,
            height: GRID - 4,
            left: dot.x * GRID + 2,
            top: dot.y * GRID + 2,
            transition: "left 100ms, top 100ms",
          }}
        />

        {/* Snake body */}
        {snake.slice(1).map((s, i) => (
          <div
            key={i}
            className="absolute rounded-sm bg-foreground-tertiary"
            style={{
              width: GRID - 2,
              height: GRID - 2,
              left: s.x * GRID + 1,
              top: s.y * GRID + 1,
            }}
          />
        ))}

        {/* Pacman head */}
        <div
          className="absolute"
          style={{
            width: GRID,
            height: GRID,
            left: head.x * GRID,
            top: head.y * GRID,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <svg
            className="text-foreground pacman-game-head"
            width="100%"
            height="100%"
            viewBox="0 0 20 20"
          >
            <circle cx="10" cy="10" r="10" fill="currentColor" />
          </svg>
        </div>

        {/* Overlay messages */}
        {!started && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
            <p className="text-sm text-foreground-secondary font-medium animate-pulse-soft">
              <span className="hidden md:inline">Press any arrow key to start</span>
              <span className="md:hidden">Swipe to start</span>
            </p>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
            <p className="text-lg font-bold text-foreground">Game Over!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function NotFoundPage() {
  return (
    <Section className="py-10">
      <Container>
        <div className="flex flex-col items-center text-center animate-fade-in">
          {/* Big 404 */}
          <h1 className="text-8xl sm:text-9xl font-bold text-foreground-tertiary/30 leading-none select-none">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-2 mb-2">
            Page not found
          </h2>
          <p className="text-sm text-foreground-secondary mb-8 max-w-sm">
            This page doesn't exist. But while you're here, fancy a quick game?
          </p>

          {/* Game */}
          <div className="mb-8">
            <PacmanGame />
          </div>

          <Link to="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
