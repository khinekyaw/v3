import { Link } from "react-router"
import { Identicon } from "./pixel"
import type { Project } from "../data/projects"
import { SWATCH, type PixelColor } from "../lib/colors"
import { excerpt } from "../lib/seo"
import { cn } from "../lib/utils"

interface LevelCardProps {
  project: Project
  /** Label in the corner tag, e.g. "LVL 01" */
  level: string
  /** Art panel color; "night" draws an orange pattern on ink */
  color: PixelColor | "night"
  className?: string
}

/** A project as a game level: generated box art on top, details below. */
export function LevelCard({ project, level, color, className }: LevelCardProps) {
  const night = color === "night"

  return (
    <Link to={`/projects/${project.slug}`} className={cn("group px-card reveal flex flex-col text-foreground", className)}>
      <div
        className={cn(
          "dot-grid-ink relative grid h-[clamp(200px,17vw,250px)] place-items-center border-b-[3px] border-border",
          night ? "bg-night" : SWATCH[color],
        )}
      >
        <span className="absolute top-3 left-3 border-2 border-night bg-night-foreground px-2 py-1 font-pixel text-[12px] uppercase text-night">
          {level}
        </span>
        <Identicon
          seed={project.slug}
          cell="16px"
          color={night ? "var(--color-pixel-orange)" : undefined}
          altColor={night ? "var(--color-pixel-blue)" : undefined}
          className="group-hover:animate-jitter"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-[22px] pt-5 pb-[22px]">
        <h3 className="text-[28px] leading-[1.05] font-bold tracking-[-0.02em]">{project.title}</h3>
        <p className="font-pixel text-[12px] uppercase text-foreground-secondary">{project.summary}</p>
        <p className="text-[15px] leading-normal text-foreground-secondary">{excerpt(project.description, 140)}</p>
        <span className="mt-auto flex min-h-11 items-center justify-between border-t-2 border-dashed border-border-light pt-1 font-pixel text-[13px] uppercase group-hover:bg-pixel-yellow group-hover:text-night">
          ▸ Play level
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}
