import { useEffect, useRef, useState, type PointerEvent } from "react"
import { glyph } from "./pixel/font"

// ── Field ──────────────────────────────────────────────────────────────
// Everything is measured in game pixels on a 224 × 256 field (the original
// arcade resolution) and scaled up to whole device pixels when drawn.
const W = 224
const H = 256
const COLS = 11
const ROWS = 5
const PITCH_X = 16
const PITCH_Y = 16
const INV_W = 11
const INV_H = 8
const PLAYER_W = 13
const PLAYER_H = 8
const PLAYER_Y = 210
const GROUND_Y = 228
const BUNKER_Y = 180
const HUD_H = 16
const MAX_CSS_WIDTH = 448
const TICK = 1000 / 60
const LIVES = 3

const ROW_POINTS = [30, 25, 20, 15, 10]
const ROW_COLORS = ["--pixel-magenta", "--pixel-yellow", "--pixel-purple", "--pixel-orange", "--pixel-blue"]

// ── Sprites ────────────────────────────────────────────────────────────
type Sprite = { w: number; h: number; runs: [number, number, number][] }

function sprite(rows: string[]): Sprite {
  const runs: [number, number, number][] = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      if (row[x] !== "x") {
        x++
        continue
      }
      let n = 1
      while (row[x + n] === "x") n++
      runs.push([x, y, n])
      x += n
    }
  })
  return { w: rows[0].length, h: rows.length, runs }
}

// Two frames so the invaders wiggle their legs as they march
const INVADER = [
  sprite(["..x.....x..", "...x...x...", "..xxxxxxx..", ".xx.xxx.xx.", "xxxxxxxxxxx", "x.xxxxxxx.x", "x.x.....x.x", "...xx.xx..."]),
  sprite(["..x.....x..", "x..x...x..x", "x.xxxxxxx.x", "xxx.xxx.xxx", "xxxxxxxxxxx", ".xxxxxxxxx.", "..x.....x..", ".x.......x."]),
]
const CANNON = sprite([
  "......x......",
  ".....xxx.....",
  ".....xxx.....",
  ".xxxxxxxxxxx.",
  "xxxxxxxxxxxxx",
  "xxxxxxxxxxxxx",
  "xxxxxxxxxxxxx",
  "xxxxxxxxxxxxx",
])
const UFO = sprite([
  ".....xxxxxx.....",
  "...xxxxxxxxxx...",
  "..xxxxxxxxxxxx..",
  ".xx.xx.xx.xx.xx.",
  "xxxxxxxxxxxxxxxx",
  "..xxx..xx..xxx..",
  "...x........x...",
])
const BOOM = sprite(["x...x.x...x", ".x...x...x.", "..x.....x..", "xx.......xx", "..x.....x..", ".x...x...x.", "x...x.x...x"])
const BUNKER = ["..xxxxxxx..", ".xxxxxxxxx.", "xxxxxxxxxxx", "xxxxxxxxxxx", "xxxxxxxxxxx", "xxxxxxxxxxx", "xxx.....xxx", "xx.......xx"]
const BUNKER_CELL = 2

// ── Game state ─────────────────────────────────────────────────────────
interface Bunker {
  x: number
  cells: boolean[][]
}

interface Game {
  alive: boolean[][]
  ox: number
  oy: number
  dir: 1 | -1
  frame: 0 | 1
  stepAcc: number
  playerX: number
  respawn: number
  shot: { x: number; y: number } | null
  bombs: { x: number; y: number }[]
  bunkers: Bunker[]
  ufo: { x: number; dir: 1 | -1 } | null
  ufoTimer: number
  booms: { x: number; y: number; t: number; color: string }[]
  banner: number
  score: number
  hi: number
  lives: number
  wave: number
  over: boolean
  /** True when the formation reached the ground (rather than lives running out) */
  invaded: boolean
}

interface Input {
  left: boolean
  right: boolean
  fire: boolean
}

const newBunkers = (): Bunker[] =>
  [28, 76, 124, 172].map((x) => ({ x, cells: BUNKER.map((row) => Array.from(row, (ch) => ch === "x")) }))

function newWave(g: Game) {
  g.alive = Array.from({ length: ROWS }, () => Array(COLS).fill(true))
  g.ox = 20
  g.oy = 36 + Math.min(g.wave - 1, 5) * 8
  g.dir = 1
  g.frame = 0
  g.stepAcc = 0
  g.shot = null
  g.bombs = []
  g.bunkers = newBunkers()
  g.banner = 1500
}

function createGame(hi: number): Game {
  const g = {
    playerX: W / 2 - PLAYER_W / 2,
    respawn: 0,
    ufo: null,
    ufoTimer: 12000,
    booms: [],
    score: 0,
    hi,
    lives: LIVES,
    wave: 1,
    over: false,
    invaded: false,
  } as unknown as Game
  newWave(g)
  return g
}

const overlaps = (ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) =>
  ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by

/** Removes bunker cells under a rect; true if any were hit */
function chipBunkers(g: Game, x: number, y: number, w: number, h: number, spread = false) {
  let hit = false
  for (const b of g.bunkers) {
    b.cells.forEach((row, cy) =>
      row.forEach((on, cx) => {
        if (!on) return
        const px = b.x + cx * BUNKER_CELL
        const py = BUNKER_Y + cy * BUNKER_CELL
        if (overlaps(x, y, w, h, px, py, BUNKER_CELL, BUNKER_CELL)) {
          row[cx] = false
          // Bullets take a ragged bite out of the neighbours too
          if (spread) {
            if (Math.random() < 0.5 && cx > 0) row[cx - 1] = false
            if (Math.random() < 0.5 && cx < row.length - 1) row[cx + 1] = false
          }
          hit = true
        }
      }),
    )
  }
  return hit
}

function invaderBounds(g: Game) {
  let minCol = COLS
  let maxCol = -1
  let maxRow = -1
  g.alive.forEach((row, r) =>
    row.forEach((on, c) => {
      if (!on) return
      minCol = Math.min(minCol, c)
      maxCol = Math.max(maxCol, c)
      maxRow = Math.max(maxRow, r)
    }),
  )
  return {
    count: g.alive.flat().filter(Boolean).length,
    left: g.ox + minCol * PITCH_X,
    right: g.ox + maxCol * PITCH_X + INV_W,
    bottom: g.oy + maxRow * PITCH_Y + INV_H,
  }
}

function boom(g: Game, x: number, y: number, color: string) {
  g.booms.push({ x, y, t: 300, color })
}

function march(g: Game) {
  const before = invaderBounds(g)
  if ((g.dir > 0 && before.right + 2 > W - 4) || (g.dir < 0 && before.left - 2 < 4)) {
    g.oy += 8
    g.dir = g.dir > 0 ? -1 : 1
  } else {
    g.ox += g.dir * 2
  }
  g.frame = g.frame ? 0 : 1

  const after = invaderBounds(g)
  // Marching invaders flatten whatever bunker they walk through
  chipBunkers(g, after.left, g.oy, after.right - after.left, after.bottom - g.oy)
  if (after.bottom >= PLAYER_Y) {
    g.lives = 0
    g.over = true
    g.invaded = true
    boom(g, g.playerX + 1, PLAYER_Y, "--night-foreground")
    return
  }

  // A random column's lowest invader drops a bomb
  if (g.bombs.length < 2 + Math.min(g.wave, 3) && Math.random() < 0.35) {
    const cols = Array.from({ length: COLS }, (_, c) => c).filter((c) => g.alive.some((row) => row[c]))
    const c = cols[Math.floor(Math.random() * cols.length)]
    const r = ROWS - 1 - [...g.alive].reverse().findIndex((row) => row[c])
    g.bombs.push({ x: g.ox + c * PITCH_X + 5, y: g.oy + r * PITCH_Y + INV_H })
  }
}

function step(g: Game, input: Input, dt: number) {
  g.booms = g.booms.filter((b) => (b.t -= dt) > 0)
  if (g.banner > 0) g.banner -= dt

  // Respawn pause after the cannon is hit
  if (g.respawn > 0) {
    g.respawn -= dt
    if (g.respawn <= 0) {
      if (g.lives <= 0) {
        g.over = true
        return
      }
      g.playerX = W / 2 - PLAYER_W / 2
    }
  } else {
    const move = (input.right ? 1 : 0) - (input.left ? 1 : 0)
    g.playerX = Math.max(4, Math.min(W - 4 - PLAYER_W, g.playerX + move * 1.4))
    if (input.fire && !g.shot) g.shot = { x: g.playerX + 6, y: PLAYER_Y - 4 }
  }

  // March faster as the formation thins out, and faster each wave
  const { count } = invaderBounds(g)
  const interval = Math.max(16, (620 * count) / (ROWS * COLS)) / (1 + (g.wave - 1) * 0.15)
  g.stepAcc += dt
  if (g.respawn <= 0 && g.stepAcc >= interval) {
    g.stepAcc = 0
    march(g)
    if (g.over) return
  }

  // Mystery ship
  g.ufoTimer -= dt
  if (!g.ufo && g.ufoTimer <= 0) {
    const dir = Math.random() < 0.5 ? 1 : -1
    g.ufo = { x: dir > 0 ? -UFO.w : W, dir }
    g.ufoTimer = 15000 + Math.random() * 10000
  }
  if (g.ufo) {
    g.ufo.x += g.ufo.dir * 0.6
    if (g.ufo.x < -UFO.w - 2 || g.ufo.x > W + 2) g.ufo = null
  }

  // Player shot
  if (g.shot) {
    g.shot.y -= 4
    const s = g.shot
    let hit = false
    for (let r = 0; r < ROWS && !hit; r++) {
      for (let c = 0; c < COLS && !hit; c++) {
        if (!g.alive[r][c]) continue
        const ix = g.ox + c * PITCH_X
        const iy = g.oy + r * PITCH_Y
        if (overlaps(s.x, s.y, 1, 4, ix, iy, INV_W, INV_H)) {
          g.alive[r][c] = false
          g.score += ROW_POINTS[r]
          boom(g, ix, iy, ROW_COLORS[r])
          hit = true
        }
      }
    }
    if (!hit && g.ufo && overlaps(s.x, s.y, 1, 4, g.ufo.x, 24, UFO.w, UFO.h)) {
      g.score += [50, 100, 150, 300][Math.floor(Math.random() * 4)]
      boom(g, g.ufo.x + 2, 24, "--pixel-magenta")
      g.ufo = null
      hit = true
    }
    if (!hit) hit = chipBunkers(g, s.x, s.y, 1, 4, true)
    if (!hit) {
      const bomb = g.bombs.findIndex((b) => overlaps(s.x, s.y, 1, 4, b.x - 1, b.y, 3, 6))
      if (bomb >= 0) {
        g.bombs.splice(bomb, 1)
        hit = true
      }
    }
    if (hit || s.y < HUD_H) g.shot = null
    g.hi = Math.max(g.hi, g.score)
  }

  // Bombs
  const speed = 1.4 + g.wave * 0.1
  let cannonHit = false
  g.bombs = g.bombs.filter((b) => {
    b.y += speed
    if (b.y > GROUND_Y - 6) return false
    if (chipBunkers(g, b.x - 1, b.y, 3, 6, true)) return false
    if (g.respawn <= 0 && overlaps(b.x - 1, b.y, 3, 6, g.playerX, PLAYER_Y, PLAYER_W, PLAYER_H)) {
      cannonHit = true
      return false
    }
    return true
  })
  if (cannonHit) {
    g.lives -= 1
    g.respawn = 1400
    boom(g, g.playerX + 1, PLAYER_Y, "--night-foreground")
    g.shot = null
    g.bombs = []
  }

  // Wave cleared
  if (invaderBounds(g).count === 0) {
    g.wave += 1
    newWave(g)
  }
}

// ── Drawing ────────────────────────────────────────────────────────────
function render(ctx: CanvasRenderingContext2D, g: Game, k: number, color: (v: string) => string, time: number) {
  const rect = (x: number, y: number, w: number, h: number, fill: string) => {
    const X = Math.round(x * k)
    const Y = Math.round(y * k)
    ctx.fillStyle = fill
    ctx.fillRect(X, Y, Math.round((x + w) * k) - X, Math.round((y + h) * k) - Y)
  }
  const draw = (s: Sprite, x: number, y: number, fill: string) => s.runs.forEach(([sx, sy, n]) => rect(x + sx, y + sy, n, 1, fill))
  const text = (value: string, x: number, y: number, fill: string) => {
    let cx = x
    for (const ch of value) {
      const rows = glyph(ch)
      rows.forEach((row, ry) => [...row].forEach((c, rx) => c === "#" && rect(cx + rx, y + ry, 1, 1, fill)))
      cx += rows[0].length + 1
    }
    return cx - x - 1
  }
  const width = (value: string) => [...value].reduce((w, ch) => w + glyph(ch)[0].length + 1, -1)

  const paper = color("--night-foreground")
  const muted = color("--night-muted")
  ctx.fillStyle = color("--night")
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // HUD
  const sx = 4 + text("SCORE ", 4, 4, muted)
  text(String(g.score).padStart(5, "0"), sx + 4, 4, paper)
  const hi = String(g.hi).padStart(5, "0")
  text(hi, W - 4 - width(hi), 4, color("--pixel-yellow"))
  text("HI", W - 4 - width(hi) - 4 - width("HI"), 4, muted)

  // Invaders
  g.alive.forEach((row, r) =>
    row.forEach((on, c) => on && draw(INVADER[g.frame], g.ox + c * PITCH_X, g.oy + r * PITCH_Y, color(ROW_COLORS[r]))),
  )
  if (g.ufo) draw(UFO, g.ufo.x, 24, color("--pixel-magenta"))

  // Bunkers
  const bunkerColor = color("--pixel-orange")
  for (const b of g.bunkers) {
    b.cells.forEach((row, cy) =>
      row.forEach((on, cx) => on && rect(b.x + cx * BUNKER_CELL, BUNKER_Y + cy * BUNKER_CELL, BUNKER_CELL, BUNKER_CELL, bunkerColor)),
    )
  }

  // Cannon, shots and bombs
  if (g.respawn <= 0 && !g.over) draw(CANNON, g.playerX, PLAYER_Y, paper)
  if (g.shot) rect(g.shot.x, g.shot.y, 1, 4, paper)
  const bombColor = color("--pixel-yellow")
  for (const b of g.bombs) {
    // Zig-zag bombs, flipping every few frames
    const flip = Math.floor(time / 120) % 2 ? 1 : -1
    rect(b.x, b.y, 1, 2, bombColor)
    rect(b.x + flip, b.y + 2, 1, 2, bombColor)
    rect(b.x, b.y + 4, 1, 2, bombColor)
  }
  for (const b of g.booms) draw(BOOM, b.x, b.y, color(b.color))

  // Ground and lives
  rect(0, GROUND_Y, W, 1, muted)
  text(String(Math.max(g.lives, 0)), 4, GROUND_Y + 6, paper)
  for (let i = 0; i < g.lives - 1; i++) draw(CANNON, 14 + i * (PLAYER_W + 4), GROUND_Y + 5, muted)
  const waveLabel = `WAVE ${g.wave}`
  text(waveLabel, W - 4 - width(waveLabel), GROUND_Y + 6, muted)

  if (g.banner > 0 && Math.floor(g.banner / 250) % 2 === 0) {
    text(waveLabel, (W - width(waveLabel)) / 2, 140, paper)
  }
}

// ── Component ──────────────────────────────────────────────────────────
const HI_KEY = "invaders-hi"

function readHi() {
  try {
    return Number(localStorage.getItem(HI_KEY)) || 0
  } catch {
    return 0
  }
}

const KEYS: Record<string, keyof Input> = {
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
  " ": "fire",
  ArrowUp: "fire",
  w: "fire",
  W: "fire",
}

/** A small Space Invaders, drawn in the site's pixel palette. */
export function InvadersGame() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<Input>({ left: false, right: false, fire: false })
  const drawRef = useRef<(time?: number) => void>(() => {})
  const [initialHi] = useState(readHi)
  const gameRef = useRef<Game | null>(null)
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready")
  const [result, setResult] = useState({ score: 0, hi: initialHi, invaded: false })

  // Size the canvas to whole device pixels and keep it drawn
  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!wrap || !canvas || !ctx) return
    gameRef.current ??= createGame(initialHi)

    const styles = getComputedStyle(document.documentElement)
    const cache = new Map<string, string>()
    const color = (v: string) => {
      if (!cache.has(v)) cache.set(v, styles.getPropertyValue(v).trim())
      return cache.get(v)!
    }
    let k = 1
    const draw = (time = performance.now()) => gameRef.current && render(ctx, gameRef.current, k, color, time)
    drawRef.current = draw

    const resize = () => {
      const cssWidth = Math.min(wrap.clientWidth, MAX_CSS_WIDTH)
      const dpr = window.devicePixelRatio || 1
      k = (cssWidth / W) * dpr
      canvas.width = Math.round(W * k)
      canvas.height = Math.round(H * k)
      canvas.style.width = `${cssWidth}px`
      canvas.style.height = `${(cssWidth * H) / W}px`
      draw()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    resize()
    return () => observer.disconnect()
  }, [initialHi])

  // Game loop and keyboard, only while playing
  useEffect(() => {
    if (status !== "playing") return
    const input = inputRef.current
    const onKey = (down: boolean) => (e: KeyboardEvent) => {
      const key = KEYS[e.key]
      if (!key) return
      e.preventDefault()
      input[key] = down
    }
    const keyDown = onKey(true)
    const keyUp = onKey(false)
    window.addEventListener("keydown", keyDown)
    window.addEventListener("keyup", keyUp)

    let frame = 0
    let last = performance.now()
    let acc = 0
    const loop = (now: number) => {
      const g = gameRef.current
      if (!g) return
      acc += Math.min(now - last, 100)
      last = now
      while (acc >= TICK && !g.over) {
        step(g, input, TICK)
        acc -= TICK
      }
      drawRef.current(now)
      if (g.over) {
        try {
          localStorage.setItem(HI_KEY, String(g.hi))
        } catch {
          // Storage can be unavailable (private mode); the score still shows
        }
        setResult({ score: g.score, hi: g.hi, invaded: g.invaded })
        setStatus("over")
        return
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("keydown", keyDown)
      window.removeEventListener("keyup", keyUp)
      input.left = input.right = input.fire = false
    }
  }, [status])

  const start = () => {
    gameRef.current = createGame(Math.max(result.hi, gameRef.current?.hi ?? 0))
    setStatus("playing")
  }

  // Touch controls: hold to move or fire
  const hold = (key: keyof Input) => ({
    onPointerDown: (e: PointerEvent) => {
      e.preventDefault()
      inputRef.current[key] = true
    },
    onPointerUp: () => (inputRef.current[key] = false),
    onPointerLeave: () => (inputRef.current[key] = false),
    onPointerCancel: () => (inputRef.current[key] = false),
  })

  return (
    <div className="flex w-full max-w-[448px] flex-col items-center gap-4">
      <div ref={wrapRef} className="relative w-full border-[3px] border-border bg-night shadow-[8px_8px_0_var(--color-border)]">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Space Invaders game. Move with the arrow keys and fire with space."
          className="block"
        />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-night/75 px-6 text-center font-pixel uppercase text-night-foreground">
            {status === "ready" ? (
              <>
                <p className="text-[15px]">Defend the planet</p>
                <p className="text-[12px] text-night-muted">
                  <span className="pointer-coarse:hidden">← → move · space fire</span>
                  <span className="hidden pointer-coarse:inline">Hold the buttons to move and fire</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-[18px] text-pixel-orange">{result.invaded ? "Invaded!" : "Out of lives"}</p>
                <p className="text-[13px]">
                  Score {String(result.score).padStart(5, "0")} · Hi {String(result.hi).padStart(5, "0")}
                </p>
              </>
            )}
            <button type="button" onClick={start} className="px-btn px-btn-primary" autoFocus={status === "over"}>
              ▸ {status === "ready" ? "Start game" : "Play again"}
            </button>
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {status === "over" ? `Game over. You scored ${result.score} points.` : ""}
        </p>
      </div>

      <div className="hidden w-full justify-between gap-3 pointer-coarse:flex">
        <div className="flex gap-3">
          <button type="button" aria-label="Move left" className="px-btn min-w-14 touch-none justify-center" {...hold("left")}>
            ◂
          </button>
          <button type="button" aria-label="Move right" className="px-btn min-w-14 touch-none justify-center" {...hold("right")}>
            ▸
          </button>
        </div>
        <button type="button" className="px-btn px-btn-primary touch-none" {...hold("fire")}>
          Fire
        </button>
      </div>
    </div>
  )
}
