import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'primary', children, className }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 text-xs font-bold rounded-lg';

  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-success text-success-foreground',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
}
