import { Link } from 'react-router';
import { Container, SiteLink } from '../components/layout';
import { LogoMark } from '../components/pixel';
import { site } from '../data/site';
import { navLinks } from '../data/nav';

export function Footer() {
  return (
    <footer className="bg-night text-night-foreground">
      <div aria-hidden="true" className="stripe-bar h-3 animate-stripe" />
      <Container className="flex flex-wrap items-center justify-between gap-7 border-b-2 border-dashed border-night-border pt-11 pb-9">
        <Link to="/" aria-label={`${site.name}, home`} className="group flex items-center gap-[22px] text-night-foreground">
          <LogoMark cell={10} ink="var(--color-night-foreground)" className="group-hover:animate-shake" />
          <span className="flex flex-col gap-1.5 font-pixel uppercase leading-none">
            <span className="text-2xl font-bold">{site.name}</span>
            <span className="text-[12px] text-night-muted">
              {site.role} · {site.location.split(',')[0]}
            </span>
          </span>
        </Link>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-0.5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <SiteLink
                  to={link.to}
                  className="block px-3 py-[15px] font-pixel text-[13px] uppercase leading-none text-night-foreground hover:bg-pixel-orange hover:text-night"
                >
                  {link.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#top" className="px-btn px-btn-night">
          ▲ Back to top
        </a>
      </Container>
      <Container className="flex flex-wrap justify-between gap-3 pt-[22px] pb-7 font-pixel text-[12px] uppercase text-night-muted">
        <p>© {site.name}</p>
        <p>Built from 1 × 1 boxes</p>
        <p>13.7563° N, 100.5018° E</p>
      </Container>
    </footer>
  );
}
