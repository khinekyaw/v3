import { Link } from "react-router"
import { Container, Section, SectionHeader } from "../components/layout"
import { LevelCard } from "../components/LevelCard"
import { professionalProjects } from "../data/projects"
import { LEVEL_COLORS } from "../lib/colors"
import { cn } from "../lib/utils"

export function Projects() {
  return (
    <Section id="work" labelledBy="work-title">
      <Container>
        <SectionHeader
          id="work-title"
          kicker="Stage 01 — Work"
          title="WORK"
          color="orange"
          meta={
            <>
              <span>Select a level ▸</span>
              <span>{String(professionalProjects.length).padStart(2, "0")} shipped</span>
              <Link to="/projects" className="text-foreground underline decoration-2 underline-offset-4 hover:text-pixel-orange">
                All levels →
              </Link>
            </>
          }
        />
        <div className="grid items-start gap-[clamp(20px,2.4vw,36px)] md:grid-cols-2 lg:grid-cols-3">
          {professionalProjects.map((project, i) => (
            <LevelCard
              key={project.slug}
              project={project}
              level={`LVL ${String(i + 1).padStart(2, "0")}`}
              color={LEVEL_COLORS[i % LEVEL_COLORS.length]}
              className={cn(i % 3 === 1 && "lg:mt-[72px]")}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
