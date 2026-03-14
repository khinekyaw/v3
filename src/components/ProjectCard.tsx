import { Link as LinkIcon } from 'lucide-react';

interface ProjectCardProps {
  logo?: string;
  title: string;
  description: string;
  links?: { label: string; href: string; icon?: 'link' | 'github' }[];
}

export function ProjectCard({ logo, title, description, links }: ProjectCardProps) {
  return (
    <div className="md:py-6 py-4 rounded-2xl flex md:flex-col gap-3.25">
      {/* Logo */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex items-center justify-center">
        {logo ? (
          <img src={logo} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-foreground-tertiary">Logo</span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col md:gap-2">
        <h3 className="text-base sm:text-lg font-bold text-foreground leading-6 sm:leading-7">{title}</h3>
        <p className="text-xs sm:text-sm text-foreground-secondary leading-5 sm:leading-[22.75px]">{description}</p>
      </div>

      {/* Links */}
      {links && links.length > 0 && (
        <div className="flex items-center gap-2">
          {links.map((link, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(link.href, '_blank', 'noopener,noreferrer');
              }}
              className="h-[22px] px-3 py-1 bg-foreground rounded-md hidden md:flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <LinkIcon size={10} className="text-primary-foreground" />
              <span className="text-[10px] font-bold text-primary-foreground uppercase leading-[15px]">
                {link.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
