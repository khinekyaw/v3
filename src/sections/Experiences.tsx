import { Container, Section, SectionHeader } from "../components/layout"
import { PixelSprite } from "../components/pixel"
import { cn } from "../lib/utils"
import { experiences } from "../data/site"

// Oldest first so the platforms climb toward the present
const steps = [...experiences].reverse()
const HEIGHTS = ["md:h-[110px]", "md:h-[210px]", "md:h-[310px]"]

export function Experiences() {
  return (
    <Section id="path" labelledBy="path-title">
      <Container>
        <SectionHeader
          id="path-title"
          kicker="Stage 02 — Experience"
          title="PATH"
          color="purple"
          meta={
            <>
              <span>2021 → now</span>
              <span>{steps.length} save files</span>
            </>
          }
        />
        <ol className="grid items-end gap-10 md:grid-cols-3 md:gap-0">
          {steps.map((exp, i) => (
            <li key={exp.company} className="flex flex-col">
              <div className="reveal pb-7 md:pr-[clamp(16px,2vw,32px)]">
                <div aria-hidden="true" className="mb-[18px] flex min-h-16 items-end gap-3.5">
                  {exp.isPresent ? (
                    <>
                      <PixelSprite name="robot" cell="6px" />
                      <p className="mb-1.5 animate-bob border-2 border-border bg-pixel-yellow px-2 py-1 font-pixel text-[12px] uppercase text-night">
                        You are here
                      </p>
                    </>
                  ) : (
                    <PixelSprite name="coin" cell="8px" className="animate-coin" />
                  )}
                </div>
                <p className="inline-block bg-primary px-2 py-[5px] font-pixel text-[12px] uppercase text-primary-foreground">
                  {exp.isPresent ? `${exp.dateRange} - Now` : exp.dateRange}
                </p>
                <h3 className="mt-3.5 mb-1 text-[clamp(28px,3vw,44px)] leading-none font-bold tracking-[-0.02em]">{exp.company}</h3>
                <p className="text-[17px] font-medium">{exp.role}</p>
                <p className="mt-1 mb-4 font-pixel text-[12px] uppercase text-foreground-secondary">{exp.location}</p>
                <p className="max-w-[46ch] text-[15px] leading-[1.55] text-foreground-secondary">{exp.summary}</p>
              </div>
              <div
                className={cn(
                  "brick reveal-grow flex h-[72px] items-end border-t-[14px] p-4",
                  exp.isPresent ? "border-pixel-orange" : "border-pixel-blue",
                  HEIGHTS[i],
                )}
              >
                <p className="bg-night px-2.5 py-1 font-pixel text-[clamp(26px,3.2vw,48px)] leading-none text-night-foreground">
                  {exp.isPresent ? "NOW" : exp.dateRange.match(/\d{4}/)?.[0]}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div aria-hidden="true" className="h-3.5 bg-night" />
      </Container>
    </Section>
  )
}
