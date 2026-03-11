import { Container, Section } from '../components/layout';
import { ExperienceCard } from '../components/ExperienceCard';

const experiences = [
  { company: "Codigo", role: "Front End Developer", dateRange: "Dec 2023", isPresent: true },
  { company: "Dkmads", role: "Front End Developer", dateRange: "Jan 2023 - Nov 2023" },
  { company: "UMG Myanmar", role: "Python Developer", dateRange: "Dec 2021 - June 2022" },
];

export function Experiences() {
  return (
    <Section id="experiences">
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
