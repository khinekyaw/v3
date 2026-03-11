import { Link } from '../ui';

interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    href: string;
  };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {action && (
        <Link href={action.href} variant="muted" className="flex items-center gap-1">
          {action.label}
          <span>&rarr;</span>
        </Link>
      )}
    </div>
  );
}
