import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}

export function Section({ children, className, id, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative py-[clamp(56px,7vw,112px)]', className)}>
      {children}
    </section>
  );
}
