import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'nav' | 'muted';
  children: ReactNode;
}

export function Link({
  variant = 'default',
  children,
  className = '',
  ...props
}: LinkProps) {
  const baseStyles = 'transition-colors cursor-pointer';

  const variants = {
    default: 'text-foreground hover:text-foreground-secondary',
    nav: 'text-foreground-secondary hover:text-foreground text-sm',
    muted: 'text-foreground-tertiary hover:text-foreground-secondary text-sm',
  };

  return (
    <a className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
