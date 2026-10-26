import { useRef, type ReactNode } from 'react';
import { Navbar } from '../../sections/Navbar';
import { Footer } from '../../sections/Footer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef);

  return (
    <div id="top" className="flex min-h-screen flex-col overflow-x-clip">
      <Navbar />
      <main ref={mainRef} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
