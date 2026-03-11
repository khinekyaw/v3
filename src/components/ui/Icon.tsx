import { cn } from '../../lib/utils';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Icon({ name, size = 'md', className }: IconProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <span
      className={cn(sizes[size], 'inline-flex items-center justify-center bg-secondary rounded-sm text-xs text-foreground-tertiary', className)}
      title={name}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
