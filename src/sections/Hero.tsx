import { LinkedinIcon, GithubIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Section } from '../components/layout';
import { Avatar, Button } from '../components/ui';
import { site } from '../data/site';

export function Hero() {
  return (
    <Section className="pt-12 pb-8">
      <Container>
        {/* Heading */}
        <h1 className="text-4xl md:text-7xl font-bold md:leading-18 mb-8 animate-fade-in-up">
          <span className="text-foreground">I build interfaces<br />that feel </span>
          <span className="text-foreground-tertiary">fast, clean<br />& intentional</span>
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col gap-8">
          {/* Profile Card */}
          <div className="flex items-start gap-6 animate-fade-in-up stagger-1">
            <Avatar src={site.avatar} size="lg" />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-foreground leading-7">{site.name}</h2>
              <p className="text-base text-foreground-secondary leading-6">{site.role} &middot; {site.location}</p>
              <div className="flex items-center gap-3 pt-1">
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <LinkedinIcon size={17} className="text-foreground" fill="currentColor" />
                </a>
                <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <GithubIcon size={15} className="text-foreground" fill="currentColor" />
                </a>
              </div>
            </div>
          </div>

          {/* Description & CTA */}
          <div className="flex flex-col gap-4 animate-fade-in-up stagger-2">
            <p className="max-w-[672px] text-base leading-[26px]">
              <span className="text-foreground-secondary">Frontend engineer who cares about </span>
              <span className="text-foreground font-medium">{site.bio.highlighted[0]}</span>
              <span className="text-foreground-secondary">.</span>
              <br />
              <span className="text-foreground-secondary">I've shipped apps across </span>
              <span className="text-foreground font-medium">{site.bio.highlighted[2]}</span>
              <span className="text-foreground-secondary">.</span>
              <br />
              <span className="text-foreground-secondary">{site.bio.full}</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <a href={`mailto:${site.email}`}>
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<span className="w-2 block h-2 shrink-0 bg-success rounded-full animate-pulse-soft" />}
                >
                  Let's Talk
                </Button>
              </a>
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  See My Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
