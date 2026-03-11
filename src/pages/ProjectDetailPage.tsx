import { ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Container, Section } from '../components/layout';
import { allProjects } from '../data/projects';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <Section className='py-10'>
      <Container>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="max-w-2xl animate-fade-in">
          {/* Video */}
          <div className="w-full aspect-video rounded-2xl bg-secondary overflow-hidden mb-8">
            {project.video ? (
              <video
                src={project.video}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm text-foreground-tertiary">
                  Video Demo
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-3">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Links */}
          {project.links.length > 0 && (
            <div className="flex items-center gap-2">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
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
      </Container>
    </Section>
  );
}
