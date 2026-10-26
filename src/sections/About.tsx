import { Container, Section, SectionHeader } from "../components/layout"
import { experiences, site } from "../data/site"

const current = experiences.find((e) => e.isPresent)

const sheet = [
  { label: "Class", value: site.role },
  current && { label: "Guild", value: `${current.role} at ${current.company}, since ${current.dateRange}` },
  { label: "Base", value: site.location },
  { label: "Edu", value: `${site.education.degree}, ${site.education.school} · ${site.education.year}` },
  { label: "Lang", value: site.languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(" · ") },
].filter((row) => !!row)

const inventory = [...site.skills.languages, ...site.skills.frameworks, ...site.skills.data]

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <Container>
        <SectionHeader
          id="about-title"
          kicker="Stage 00 — About"
          title="PLAYER 1"
          color="blue"
          meta={
            <>
              <span>Select character ▸</span>
              <span>1 player</span>
            </>
          }
        />
        <div className="grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="reveal">
            <p className="text-[clamp(32px,4.2vw,60px)] leading-[1.06] font-bold tracking-[-0.025em]">
              I build web apps that{" "}
              <span className="box-decoration-clone bg-pixel-blue px-[0.12em] text-night">load fast</span>,{" "}
              <span className="box-decoration-clone bg-pixel-orange px-[0.12em] text-night">work for everyone</span> and{" "}
              <span className="box-decoration-clone bg-pixel-purple px-[0.12em] text-night-foreground">stay easy to build on</span>.
            </p>
            <p className="mt-7 max-w-[560px] text-lg leading-[1.55] text-foreground-secondary">
              {site.bio.intro} {site.bio.more}
            </p>
          </div>

          <aside aria-label="Character sheet" className="px-card reveal">
            <div className="flex items-center justify-between bg-primary px-[18px] py-3 font-pixel text-[13px] uppercase text-primary-foreground">
              <span>Character sheet</span>
              <span>P1</span>
            </div>
            <dl>
              {sheet.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[92px_minmax(0,1fr)] gap-4 px-[18px] py-3.5 ${i > 0 ? "border-t-2 border-dashed border-border-light" : ""}`}
                >
                  <dt className="pt-[3px] font-pixel text-[12px] uppercase text-foreground-secondary">{row.label}</dt>
                  <dd className="text-base leading-[1.4] font-medium">{row.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 border-t-2 border-dashed border-border-light px-[18px] py-3.5">
                <dt className="pt-[3px] font-pixel text-[12px] uppercase text-foreground-secondary">Items</dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {inventory.map((item) => (
                      <li
                        key={item}
                        className="border-2 border-border bg-background px-2 py-[5px] font-pixel text-[12px] uppercase"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </Section>
  )
}
