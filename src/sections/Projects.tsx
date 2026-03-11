import { Container, Section, SectionHeader } from '../components/layout';
import { ProjectCard } from '../components/ProjectCard';

const projects = [
  {
    title: 'Finance Tracker',
    description: 'App An app for managing personal finances and budgeting.',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    title: 'Finance Tracker',
    description: 'App An app for managing personal finances and budgeting.',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    title: 'Finance Tracker',
    description: 'App An app for managing personal finances and budgeting.',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    title: 'Finance Tracker',
    description: 'App An app for managing personal finances and budgeting.',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    title: 'Finance Tracker',
    description: 'App An app for managing personal finances and budgeting.',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    title: 'Finance Tracker',
    description: 'App An app for managing personal finances and budgeting.',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
];

export function Projects() {
  return (
    <Section>
      <Container>
        <SectionHeader
          title="Projects"
          action={{ label: 'See More Projects', href: '#' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                links={project.links}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
