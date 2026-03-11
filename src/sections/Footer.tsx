import { Container } from '../components/layout';

export function Footer() {
  return (
    <footer className="py-8 border-t border-border-light">
      <Container>
        <p className="text-center text-sm text-foreground-tertiary">
          &copy;Daniel. Built with <span className="text-accent">&hearts;</span>
        </p>
      </Container>
    </footer>
  );
}
