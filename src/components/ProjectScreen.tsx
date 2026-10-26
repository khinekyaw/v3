import { useState } from "react"
import { Identicon, PixelMedia } from "./pixel"
import { Image } from "./ui/Image"
import { VideoPlayer } from "./VideoPlayer"
import type { Project } from "../data/projects"

/** The project's media framed as a pixel "screen": boxes until hovered or toggled. YouTube embeds play as is. */
export function ProjectScreen({ project }: { project: Project }) {
  const [showOriginal, setShowOriginal] = useState(false)
  // A cross-origin iframe can't be drawn to a canvas, so embeds skip the pixel effect
  const hasMedia = !project.youtube && Boolean(project.video || project.image)

  return (
    <figure className="border-[3px] border-border bg-night shadow-[10px_10px_0_var(--color-border)]">
      <figcaption className="flex items-center gap-2 border-b-[3px] border-border bg-night py-1 pr-1 pl-4 font-pixel text-[12px] uppercase text-night-foreground">
        <span aria-hidden="true" className="block size-2.5 bg-pixel-orange" />
        <span aria-hidden="true" className="block size-2.5 bg-pixel-yellow" />
        <span aria-hidden="true" className="block size-2.5 bg-pixel-blue" />
        <span className="ml-2 min-w-0 truncate">Now playing — {project.title}</span>
        {hasMedia && (
          <>
            <span aria-hidden="true" className="ml-auto hidden text-night-muted md:inline">
              Hover to reveal
            </span>
            <button
              type="button"
              aria-pressed={showOriginal}
              onClick={() => setShowOriginal((v) => !v)}
              className="ml-auto flex min-h-11 shrink-0 items-center gap-2 px-3 uppercase text-night-foreground hover:bg-pixel-yellow hover:text-night md:ml-3"
            >
              <span
                aria-hidden="true"
                className={`block size-2.5 border-2 border-current ${showOriginal ? "bg-current" : ""}`}
              />
              Original
            </button>
          </>
        )}
      </figcaption>
      {project.youtube ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${project.youtube}?rel=0`}
          title={`${project.title} video`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="block aspect-video w-full"
        />
      ) : hasMedia ? (
        <PixelMedia showOriginal={showOriginal} className="aspect-video w-full overflow-hidden">
          {project.video ? (
            <VideoPlayer src={project.video} className="size-full" />
          ) : (
            <Image src={project.image!} alt={`${project.title} preview`} className="size-full object-cover" />
          )}
        </PixelMedia>
      ) : (
        <div className="dot-grid-night grid aspect-video w-full place-items-center">
          <Identicon seed={project.slug} cell="20px" color="var(--color-pixel-orange)" altColor="var(--color-pixel-blue)" />
        </div>
      )}
    </figure>
  )
}
