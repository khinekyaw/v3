import { Badge } from './ui';

interface ExperienceCardProps {
  company: string;
  role: string;
  dateRange: string;
  isPresent?: boolean;
}

export function ExperienceCard({ company, role, dateRange, isPresent }: ExperienceCardProps) {
  return (
    <div className="pl-8 relative flex flex-col">
      {/* Timeline dot */}
      <div
        className={`w-2.5 h-2.5 absolute left-[-5px] top-2 rounded-full border-2 border-background ${
          isPresent ? 'bg-foreground' : 'bg-foreground-tertiary'
        }`}
      />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h3 className="text-base sm:text-lg font-bold text-foreground leading-6 sm:leading-7">{company}</h3>
            {isPresent && (
              <Badge variant="primary" className="text-[10px] uppercase leading-[15px]">
                Present
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm font-medium text-foreground-secondary leading-5">{role}</p>
        </div>
        <span className="text-[11px] sm:text-xs font-medium text-foreground-tertiary uppercase leading-4 sm:shrink-0">
          {dateRange}
        </span>
      </div>
    </div>
  );
}
