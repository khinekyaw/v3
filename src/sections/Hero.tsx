import type { CSSProperties } from "react"
import { SiteLink } from "../components/layout"
import {
  BandCanvas,
  Halftone,
  PixelSprite,
  PixelText,
  ScrambleText,
  WORLD_COLS,
  WORLD_ROWS,
} from "../components/pixel"
import { PORTRAIT_COLS, PORTRAIT_ROWS } from "../components/pixel/portrait"
import type { SpriteName } from "../components/pixel/sprites"
import { PIXEL_VAR, type PixelColor } from "../lib/colors"
import { site } from "../data/site"

// The hero is a 60 × 36 grid of boxes; --c is one box, sized from the
// hero's own width so the whole poster scales as one piece.
const c = (n: number) => `calc(var(--c) * ${n})`
const at = (x: number, y: number): CSSProperties => ({
  left: `${(x / WORLD_COLS) * 100}%`,
  top: `${(y / WORLD_ROWS) * 100}%`,
})

const WORDS = ["INTERFACES", "EXPERIENCES", "TOOLS", "IDEAS", "SYSTEMS"]

const SPRITES: { name: SpriteName; color?: PixelColor; x: number; y: number }[] = [
  { name: "invader", color: "blue", x: 20, y: 1.5 },
  { name: "plus", color: "orange", x: 28.5, y: 2 },
  { name: "coin", x: 14.5, y: 1 },
  { name: "star", color: "blue", x: 18, y: 8.5 },
  { name: "robot", x: 30, y: 4.5 },
  { name: "heart", color: "magenta", x: 2, y: 29 },
  { name: "plus", color: "orange", x: 1.5, y: 33.5 },
  { name: "heart", color: "magenta", x: 42, y: 26 },
  { name: "ghost", color: "blue", x: 37.5, y: 29.5 },
  { name: "plus", color: "orange", x: 54, y: 14 },
  { name: "star", color: "yellow", x: 47.5, y: 16.5 },
  { name: "coin", x: 41, y: 22.5 },
  { name: "coin", x: 25, y: 33.3 },
  { name: "star", color: "yellow", x: 10, y: 31 },
  { name: "plus", color: "orange", x: 56, y: 1.5 },
]

const GLOW_X = 52.1
const GLOW_Y = 28.2

// Portrait placement in boxes; each halftone dot cell is 0.46 of a box
const PORTRAIT_X = 45.6
const PORTRAIT_Y = 23.2
const PORTRAIT_CELL = 0.46

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="@container relative border-b-[3px] border-border [--c:calc(100cqw/60)] max-md:[--c:calc(100cqw/24)]"
    >
      {/* Name, bio and actions: pinned into the top-left of the poster on desktop */}
      <div className="relative z-10 px-4 pt-7 pb-5 md:absolute md:top-[calc(var(--c)*1.3)] md:left-[calc(var(--c)*2)] md:w-[calc(var(--c)*16)] md:p-0">
        <p className="mb-4 animate-rise-in font-pixel text-[12px] uppercase md:mb-[calc(var(--c)*0.9)] md:text-[calc(var(--c)*0.52)]">
          Player 01 · Est. 2021 · {site.location.split(",")[0]}
        </p>
        <h1 id="hero-title" className="sr-only">
          {site.name}, {site.role.toLowerCase()}. I build interfaces, experiences, tools, ideas and systems that feel alive.
        </h1>
        <div
          aria-hidden="true"
          className="flex flex-col gap-[calc(var(--c)*0.75)] text-foreground"
          style={{ filter: `drop-shadow(${c(0.25)} ${c(0.25)} 0 var(--color-pixel-orange))` }}
        >
          {["KHINE", "KYAW", "TUN"].map((word, i) => (
            <PixelText
              key={word}
              text={word}
              size={c(0.5)}
              label={false}
              charClassName="animate-drop-in"
              delay={0.3 + i * 0.35}
              stagger={0.07}
            />
          ))}
        </div>
        <p className="mt-5 max-w-[34ch] animate-rise-in text-[17px] font-medium leading-[1.38] [animation-delay:1.3s] md:mt-[calc(var(--c)*1.3)] md:max-w-[calc(var(--c)*12.5)] md:text-[calc(var(--c)*0.68)]">
          {site.bio.intro}
        </p>
        <div className="mt-5 flex animate-rise-in flex-wrap gap-3 [animation-delay:1.5s] md:mt-[calc(var(--c)*1.1)]">
          <a className="px-btn px-btn-primary" href={`mailto:${site.email}`}>
            <span aria-hidden="true" className="animate-blink">
              ▸
            </span>
            Press start
          </a>
          <SiteLink to="/#work" className="px-btn">
            See levels ↓
          </SiteLink>
        </div>
      </div>

      {/* The poster */}
      <div aria-hidden="true" className="relative h-[calc(var(--c)*36)] overflow-hidden max-md:h-[calc(var(--c)*30)]">
        <div className="absolute top-0 left-0 h-[calc(var(--c)*36)] w-[calc(var(--c)*60)] max-md:top-[calc(var(--c)*-3)] max-md:left-[calc(var(--c)*-20.5)]">
          <BandCanvas className="absolute inset-0 size-full" />

          {/* Crosshair glow */}
          <div className="glow-line absolute top-0 bottom-0 z-1 w-0.5 animate-beam-v" style={{ left: c(GLOW_X) }} />
          <div className="glow-line absolute right-0 left-0 z-1 h-0.5 animate-beam-h" style={{ top: c(GLOW_Y) }} />
          <div
            className="absolute right-0 left-0 z-1 h-px bg-pixel-magenta opacity-50 shadow-[0_0_10px_2px_var(--color-pixel-magenta)]"
            style={{ top: c(10.5) }}
          />
          {/* The star sits behind the portrait and glows through the gaps between dots */}
          <div
            className="flare-core absolute z-1 size-[calc(var(--c)*3)] -translate-1/2 animate-star-glow"
            style={{ left: c(GLOW_X), top: c(GLOW_Y) }}
          />
          <div
            className="flare-star absolute z-1 size-[calc(var(--c)*7)] -translate-1/2 animate-star-glow"
            style={{ left: c(GLOW_X), top: c(GLOW_Y) }}
          />

          {/* Halftone portrait with a scanning row */}
          <div
            className="absolute h-[calc(var(--c)*9)] w-[calc(var(--c)*11)] bg-pixel-blue opacity-40 blur-[calc(var(--c)*1.7)]"
            style={{ left: c(46.6), top: c(25) }}
          />
          <Halftone
            cell={c(PORTRAIT_CELL)}
            className="absolute z-2 text-foreground"
            style={{ left: c(PORTRAIT_X), top: c(PORTRAIT_Y) }}
          />
          <div
            className="absolute z-3 bg-pixel-orange opacity-85 mix-blend-multiply dark:mix-blend-screen"
            style={
              {
                left: c(PORTRAIT_X),
                top: c(PORTRAIT_Y),
                width: c(PORTRAIT_CELL * PORTRAIT_COLS),
                height: c(PORTRAIT_CELL),
                "--scan-distance": c(PORTRAIT_CELL * PORTRAIT_ROWS),
                animation: `scan 3.2s steps(${PORTRAIT_ROWS}) infinite`,
              } as CSSProperties
            }
          />

          {SPRITES.map((s, i) => (
            <PixelSprite
              key={i}
              name={s.name}
              color={s.color ? PIXEL_VAR[s.color] : undefined}
              cell={c(0.5)}
              className={`absolute z-2 ${s.name === "coin" ? "animate-coin" : "animate-sprite-bob"}`}
              style={{ ...at(s.x, s.y), animationDelay: `${(i * 0.17).toFixed(2)}s` }}
            />
          ))}

          {/* Slogan rides the band at 45° */}
          <div
            className="absolute z-3 flex -translate-1/2 -rotate-45 flex-col items-center gap-[calc(var(--c)*0.8)] text-night"
            style={{
              left: c(32.5),
              top: c(18.5),
              filter: `drop-shadow(${c(0.2)} ${c(0.2)} 0 var(--color-pixel-orange))`,
            }}
          >
            <PixelText text="I BUILD" size={c(0.4)} label={false} />
            <ScrambleText words={WORDS} size={c(0.4)} />
            <PixelText text="THAT FEEL ALIVE" size={c(0.4)} label={false} />
          </div>

          <p
            className="absolute z-3 text-[calc(var(--c)*0.62)] font-medium whitespace-nowrap [writing-mode:vertical-rl]"
            style={{ left: c(58.2), top: c(6.4) }}
          >
            {site.role} · {site.location}
          </p>
          <p
            className="absolute z-3 text-[calc(var(--c)*0.62)] font-medium whitespace-pre"
            style={{ left: c(35.8), top: c(34.1) }}
          >
            {"( 13.75 N )  →  ( 100.50 E )"}
          </p>
        </div>
      </div>
    </section>
  )
}
