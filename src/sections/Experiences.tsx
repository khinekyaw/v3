import { Container, Section } from '../components/layout';
import { ExperienceCard } from '../components/ExperienceCard';

const experiences = [
  { company: "Acme.inc", role: "Frontend Developer", dateRange: "Dec 2024", isPresent: true },
  { company: "Orion Global Services", role: "Full Stack Developer", dateRange: "Aug 2020 - May 2024" },
  { company: "Vertex Dynamics", role: "Front-end Developer", dateRange: "Aug 2020 - May 2024" },
  { company: "AtlasCore Systems", role: "Web Developer", dateRange: "Aug 2016 - July 2020" },
];

export function Experiences() {
  return (
    <Section>
      <Container>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Experiences
        </h2>

        {/* Timeline container */}
        <div className="relative flex flex-col gap-8">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-0 w-px h-full bg-border" />

          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ExperienceCard
                company={exp.company}
                role={exp.role}
                dateRange={exp.dateRange}
                isPresent={exp.isPresent}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
