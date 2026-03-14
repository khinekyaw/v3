import { ArrowLeft, Link as LinkIcon } from "lucide-react"
import { Link, useParams, Navigate } from "react-router-dom"
import { Container, Section } from "../components/layout"
import { RichText } from "../components/RichText"
import { VideoPlayer } from "../components/VideoPlayer"
import { allProjects } from "../data/projects"

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = allProjects.find((p) => p.slug === slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <Section className="py-10">
      <Container>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="max-w-2xl animate-fade-in">
          {/* Media */}
          <div className="w-full aspect-video rounded-2xl bg-secondary overflow-hidden mb-8">
            {project.video ? (
              <VideoPlayer src={project.video} className="w-full h-full" />
            ) : project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover relative"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm text-foreground-tertiary">
                  Preview
                </span>
              </div>
            )}
          </div>

          {/* Title + Links */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h1 className="text-2xl font-bold text-foreground">
              {project.title}
            </h1>
            {project.links.length > 0 && (
              <div className="flex items-center gap-2">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[22px] px-3 py-1 bg-foreground rounded-md flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                  >
                    <LinkIcon size={10} className="text-primary-foreground" />
                    <span className="text-[10px] font-bold text-primary-foreground uppercase leading-[15px]">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <RichText content={project.description} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
