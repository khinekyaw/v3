import { GithubIcon, LinkedinIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Container, Section } from "../components/layout"
import { RotatingText } from "../components/RotatingText"
import { Avatar, Button } from "../components/ui"
import { site } from "../data/site"

const rotatingWords = ["Interfaces", "Experiences", "Tools", "Ideas", "Systems"]

export function Hero() {
  return (
    <Section className="pt-12 pb-8">
      <Container>
        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[55px] md:leading-20.5 mb-6 md:mb-8 animate-fade-in-up">
          <span className="text-foreground-tertiary">I Build </span>
          {/* <br /> */}
          <br className="block md:hidden" />
          <RotatingText
            words={rotatingWords}
            className="text-foreground"
          />
          <br />
          <span className="text-foreground-tertiary">that Feel </span>
          <span className="text-foreground-tertiary">Alive</span>
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col gap-8">
          {/* Profile Card */}
          <div className="flex items-start gap-6 animate-fade-in-up stagger-1">
            <Avatar src={site.avatar} size="lg" />
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-foreground leading-7">
                {site.name}
              </h2>
              <p className="text-sm text-foreground-secondary leading-6 mb-1">
                {site.role}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <LinkedinIcon
                    size={17}
                    className="text-foreground"
                    fill="currentColor"
                  />
                </a>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <GithubIcon
                    size={15}
                    className="text-foreground"
                    fill="currentColor"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Description & CTA */}
          <div className="flex flex-col gap-4 animate-fade-in-up stagger-2">
            <p className="max-w-[460px] text-base leading-[26px] text-foreground-secondary">
              {site.bio.full}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4">
              <a href={`mailto:${site.email}`}>
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={
                    <span className="w-2 block h-2 shrink-0 bg-success rounded-full animate-pulse-soft" />
                  }
                >
                  Let's Talk With Me
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
  )
}
