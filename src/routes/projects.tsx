import type { Route } from "./+types/projects"
import { BackLink } from "../components/BackLink"
import { Container, Section, SectionHeader } from "../components/layout"
import { LevelCard } from "../components/LevelCard"
import { allProjects, experimentProjects, professionalProjects, type Project } from "../data/projects"
import { LEVEL_COLORS, SWATCH, type PixelColor } from "../lib/colors"
import { seo } from "../lib/seo"
import { cn } from "../lib/utils"

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Projects",
    description:
      "Client work and side projects by Khine Kyaw Tun: streaming, automotive and agency sites, plus local AI tools and a Figma plugin.",
    path: "/projects",
  })

function World({
  id,
  title,
  world,
  color,
  projects,
}: {
  id: string
  title: string
  world: number
  color: PixelColor
  projects: Project[]
}) {
  return (
    <section aria-labelledby={id} className="mt-16 first:mt-0">
      <h2 id={id} className="mb-8 flex items-center gap-3 border-b-[3px] border-border pb-4 font-pixel text-[15px] uppercase">
        <span aria-hidden="true" className={cn("block size-3.5", SWATCH[color])} />
        World {world} — {title}
        <span className="ml-auto text-foreground-secondary">{String(projects.length).padStart(2, "0")} levels</span>
      </h2>
      <div className="grid items-start gap-[clamp(20px,2.4vw,36px)] md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <LevelCard
            key={project.slug}
            project={project}
            level={`LVL ${world}-${String(i + 1).padStart(2, "0")}`}
            color={LEVEL_COLORS[(i + world - 1) % LEVEL_COLORS.length]}
            className={cn(i % 3 === 1 && "lg:mt-[72px]")}
          />
        ))}
      </div>
    </section>
  )
}

export default function Projects() {
  return (
    <Section labelledBy="projects-title">
      <Container>
        <BackLink to="/" label="Back to start" />
        <SectionHeader
          as="h1"
          id="projects-title"
          kicker="Level select"
          title="ALL LEVELS"
          color="orange"
          meta={
            <>
              <span>{allProjects.length} levels</span>
              <span>2 worlds</span>
            </>
          }
        />
        <World id="world-1" world={1} title="Professional" color="blue" projects={professionalProjects} />
        <World id="world-2" world={2} title="Experiments" color="magenta" projects={experimentProjects} />
      </Container>
    </Section>
  )
}
