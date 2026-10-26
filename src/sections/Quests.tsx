import { Link } from "react-router"
import { Container, Section, SectionHeader } from "../components/layout"
import { LogCard } from "../components/LogCard"
import { Identicon } from "../components/pixel"
import { experimentProjects } from "../data/projects"
import { posts } from "../data/posts"
import { PIXEL_CYCLE, PIXEL_VAR } from "../lib/colors"

export function Quests() {
  const [latest] = posts

  return (
    <Section id="lab" labelledBy="lab-title">
      <Container>
        <SectionHeader
          id="lab-title"
          kicker="Stage 03 — Lab & Log"
          title="SIDE QUESTS"
          color="magenta"
          meta={
            <>
              <span>Optional · rewarding</span>
              <span>{String(experimentProjects.length).padStart(2, "0")} experiments</span>
            </>
          }
        />
        <div className="grid items-start gap-[clamp(32px,4vw,72px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <p className="mb-3.5 flex justify-between font-pixel text-[13px] uppercase">
              <span>Lab — experiments</span>
              <span className="text-foreground-secondary">Inventory</span>
            </p>
            <ul className="border-b-[3px] border-border">
              {experimentProjects.map((project, i) => (
                <li key={project.slug} className="reveal border-t-[3px] border-border">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group grid grid-cols-[44px_40px_minmax(0,1fr)_auto] items-center gap-4 py-[18px] hover:bg-pixel-yellow hover:text-night"
                  >
                    <span className="font-pixel text-[13px] text-foreground-secondary group-hover:text-night">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <Identicon
                      seed={project.slug}
                      size={5}
                      cell="8px"
                      color={PIXEL_VAR[PIXEL_CYCLE[(i + 1) % PIXEL_CYCLE.length]]}
                      altColor="var(--color-foreground)"
                    />
                    <span>
                      <span className="block text-[22px] leading-[1.15] font-bold tracking-[-0.01em]">{project.title}</span>
                      <span className="mt-[3px] block text-[15px] text-foreground-secondary group-hover:text-night">
                        {project.summary}
                      </span>
                    </span>
                    <span aria-hidden="true" className="pr-2 font-pixel text-[13px]">
                      ▸
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3.5 flex justify-between font-pixel text-[13px] uppercase">
              <span>Log — latest entry</span>
              <Link to="/blog" className="text-foreground underline decoration-2 underline-offset-4 hover:text-pixel-orange">
                All entries →
              </Link>
            </p>
            {latest && <LogCard post={latest} label="MSG 001" />}
          </div>
        </div>
      </Container>
    </Section>
  )
}
