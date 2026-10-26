import type { Route } from "./+types/project"
import { BackLink } from "../components/BackLink"
import { GameOver } from "../components/GameOver"
import { Container, Section } from "../components/layout"
import { PagerLinks } from "../components/PagerLinks"
import { ProjectScreen } from "../components/ProjectScreen"
import { RichText } from "../components/RichText"
import { allProjects } from "../data/projects"
import { levelInfo } from "../lib/levels"
import { excerpt, seo } from "../lib/seo"

export const meta: Route.MetaFunction = ({ params }) => {
  const project = allProjects.find((p) => p.slug === params.slug)
  if (!project) return seo({ title: "Level not found", path: `/projects/${params.slug}`, noindex: true })
  return seo({
    title: project.title,
    description: excerpt(project.description) || project.summary,
    path: `/projects/${project.slug}`,
  })
}

export default function ProjectDetail({ params }: Route.ComponentProps) {
  const index = allProjects.findIndex((p) => p.slug === params.slug)
  if (index === -1) return <GameOver />

  const project = allProjects[index]
  const { isProfessional, label: level } = levelInfo(project)
  const prev = allProjects[(index - 1 + allProjects.length) % allProjects.length]
  const next = allProjects[(index + 1) % allProjects.length]

  return (
    <Section>
      <Container>
        <BackLink to="/projects" label="Back to levels" />

        <header className="mb-12 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="mb-5 inline-block bg-primary px-2 py-[5px] font-pixel text-[12px] uppercase text-primary-foreground">
              {level} · {isProfessional ? "Professional" : "Experiment"}
            </p>
            <h1 className="animate-rise-in text-[clamp(40px,6vw,88px)] leading-[0.95] font-bold tracking-[-0.035em]">
              {project.title}
            </h1>
            <p className="mt-5 font-pixel text-[14px] uppercase text-foreground-secondary">{project.summary}</p>
          </div>
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="px-btn px-btn-primary">
                  ▸ {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>

        <ProjectScreen key={project.slug} project={project} />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl">
            <RichText content={project.description} />
          </div>
          <aside aria-label="Level info" className="px-card">
            <p className="bg-primary px-[18px] py-3 font-pixel text-[13px] uppercase text-primary-foreground">Level info</p>
            {project.logo && (
              <div className="dot-grid grid place-items-center border-b-2 border-dashed border-border-light bg-background p-6">
                <img src={project.logo} alt={`${project.title} logo`} className="size-20 object-contain" />
              </div>
            )}
            <dl>
              <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-4 px-[18px] py-3.5">
                <dt className="font-pixel text-[12px] uppercase text-foreground-secondary">World</dt>
                <dd className="font-medium">{isProfessional ? "Professional" : "Experiments"}</dd>
              </div>
              <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-4 border-t-2 border-dashed border-border-light px-[18px] py-3.5">
                <dt className="font-pixel text-[12px] uppercase text-foreground-secondary">Level</dt>
                <dd className="font-medium">{level}</dd>
              </div>
              <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-4 border-t-2 border-dashed border-border-light px-[18px] py-3.5">
                <dt className="font-pixel text-[12px] uppercase text-foreground-secondary">Links</dt>
                <dd className="font-medium">
                  {project.links.length > 0 ? (
                    <ul className="flex flex-col gap-1">
                      {project.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-pixel-orange decoration-2 underline-offset-4 hover:text-pixel-orange"
                          >
                            {link.label.charAt(0) + link.label.slice(1).toLowerCase()} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-foreground-secondary">Private build</span>
                  )}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <PagerLinks
          noun="level"
          prev={{ to: `/projects/${prev.slug}`, title: prev.title }}
          next={{ to: `/projects/${next.slug}`, title: next.title }}
        />
      </Container>
    </Section>
  )
}
