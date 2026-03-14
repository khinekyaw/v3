import { Link } from 'react-router-dom';
import { Container, Section } from '../components/layout';
import { ProjectCard } from '../components/ProjectCard';
import { professionalProjects } from '../data/projects';

const featured = professionalProjects.slice(0, 6);

export function Projects() {
  return (
    <Section id="projects">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-foreground">Projects</h2>
          <Link
            to="/projects"
            className="text-foreground-tertiary hover:text-foreground-secondary text-sm transition-colors cursor-pointer flex items-center gap-1"
          >
            See More Projects
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, index) => (
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
      </Container>
    </Section>
  );
}
