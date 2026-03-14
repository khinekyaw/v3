import { Link as LinkIcon } from 'lucide-react';

interface ProjectCardProps {
  logo?: string;
  title: string;
  description: string;
  links?: { label: string; href: string; icon?: 'link' | 'github' }[];
}

export function ProjectCard({ logo, title, description, links }: ProjectCardProps) {
  return (
    <div className="py-6 rounded-2xl flex flex-col gap-3.25">
      {/* Logo */}
      <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center">
        {logo ? (
          <img src={logo} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-foreground-tertiary">Logo</span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-foreground leading-7">{title}</h3>
        <p className="text-sm text-foreground-secondary leading-[22.75px]">{description}</p>
      </div>

      {/* Links */}
      {links && links.length > 0 && (
        <div className="flex items-center gap-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="h-[22px] px-3 py-1 bg-foreground rounded-md flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <LinkIcon size={10} className="text-primary-foreground" />
              <span className="text-[10px] font-bold text-primary-foreground uppercase leading-[15px]">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
