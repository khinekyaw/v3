import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1440px] px-[clamp(16px,3.4vw,48px)]', className)}>
      {children}
    </div>
  );
}
