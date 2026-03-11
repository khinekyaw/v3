import type { ReactNode } from 'react';
import { Navbar } from '../../sections/Navbar';
import { Footer } from '../../sections/Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
