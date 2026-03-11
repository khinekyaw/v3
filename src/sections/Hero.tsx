import { LinkedinIcon, GithubIcon } from 'lucide-react';
import { Container, Section } from '../components/layout';
import { Avatar, Button } from '../components/ui';

export function Hero() {
  return (
    <Section className="pt-12 pb-8">
      <Container>
        {/* Heading */}
        <h1 className="text-4xl md:text-7xl font-bold md:leading-18 mb-8 animate-fade-in-up">
          <span className="text-foreground">A Minimalist <br />Portfolio </span>
          <span className="text-foreground-tertiary">Template <br />for Developer</span>
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col gap-8">
          {/* Profile Card */}
          <div className="flex items-start gap-6 animate-fade-in-up stagger-1">
            <Avatar src="/kkt.png" size="lg" />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-foreground leading-7">Daniel Rio</h2>
              <p className="text-base text-foreground-secondary leading-6">Full Stack Developer</p>
              <div className="flex items-center gap-3 pt-1">
                <a href="#" className="hover:scale-110 transition-transform">
                  <LinkedinIcon size={17} className="text-foreground" fill="currentColor" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <GithubIcon size={15} className="text-foreground" fill="currentColor" />
                </a>
              </div>
            </div>
          </div>

          {/* Description & CTA */}
          <div className="flex flex-col gap-4 animate-fade-in-up stagger-2">
            {/* Description */}
            <p className="max-w-[672px] text-base leading-[26px]">
              <span className="text-foreground-secondary">Simpfolio offers a </span>
              <span className="text-foreground font-medium">sleek design for developers</span>
              <span className="text-foreground-secondary"> to showcase their work effectively.</span>
              <br />
              <span className="text-foreground-secondary">Whether you're a </span>
              <span className="text-foreground font-medium">coder, designer, or tech enthusiast</span>
              <span className="text-foreground-secondary">, this template helps you display</span>
              <br />
              <span className="text-foreground-secondary">your projects with style.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<span className="w-2 block h-2 shrink-0 bg-success rounded-full animate-pulse-soft" />}
              >
                Let's Talk With Me
              </Button>
              <Button variant="outline" size="lg">
                Find Out More
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
