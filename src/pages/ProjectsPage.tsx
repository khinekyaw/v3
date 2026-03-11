import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Section, SectionHeader } from '../components/layout';
import { ProjectCard } from '../components/ProjectCard';
import { professionalProjects, experimentProjects, type Project } from '../data/projects';

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          to={`/projects/${project.slug}`}
          className="animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProjectCard
            logo={project.logo}
            title={project.title}
            description={project.summary}
            links={project.links}
          />
        </Link>
      ))}
    </div>
  );
}

export function ProjectsPage() {
  return (
    <Section className='py-10'>
      <Container>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-16 animate-fade-in">
          All Projects
        </h1>

        <div className="flex flex-col gap-16">
          <div className="animate-fade-in-up">
            <SectionHeader title="Professional" />
            <ProjectGrid projects={professionalProjects} />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <SectionHeader title="Experiments" />
            <ProjectGrid projects={experimentProjects} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
