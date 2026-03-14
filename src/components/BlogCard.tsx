interface BlogCardProps {
  date: string;
  title: string;
  tags: string[];
}

export function BlogCard({ date, title, tags }: BlogCardProps) {
  return (
    <div className="p-4 md:p-5 rounded-xl md:rounded-2xl border border-border flex flex-col justify-between h-[190px] md:h-[218px] hover-lift cursor-pointer">
      {/* Top content */}
      <div className="flex flex-col">
        {/* Date */}
        <p className="text-[10px] font-semibold text-foreground-tertiary leading-[15px]">
          {date}
        </p>

        {/* Title */}
        <h3 className="text-base font-bold text-foreground leading-[22px] mt-3">
          {title}
        </h3>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-secondary rounded-lg text-[10px] font-medium text-foreground-secondary leading-4 hover:bg-border transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
