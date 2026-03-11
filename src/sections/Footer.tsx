import { Container } from '../components/layout';
import { site } from '../data/site';

export function Footer() {
  return (
    <footer className="py-8 border-t border-border-light">
      <Container>
        <p className="text-center text-sm text-foreground-tertiary">
          &copy; {site.name}. Built with <span className="text-accent">&hearts;</span>
        </p>
      </Container>
    </footer>
  );
}
