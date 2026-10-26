import { PIXEL_CYCLE, SWATCH } from "../lib/colors"
import { cn } from "../lib/utils"
import { site } from "../data/site"

const skills = Object.values(site.skills).flat()

/** Scrolling strip of skills; the second copy keeps the loop seamless. */
export function Ticker() {
  return (
    <div className="group overflow-hidden border-b-[3px] border-border bg-night text-pixel-orange">
      {/* Duration scales with the list so the scroll speed stays the same */}
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${skills.length * 2.8}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? "Skills" : undefined}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center gap-7 py-4 pr-7 font-pixel text-[18px] whitespace-nowrap uppercase"
          >
            {skills.map((skill, i) => (
              <li key={skill} className="flex items-center gap-7">
                <span aria-hidden="true" className={cn("block size-2.5", SWATCH[PIXEL_CYCLE[i % PIXEL_CYCLE.length]])} />
                {skill}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
