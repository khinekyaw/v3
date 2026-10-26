import type { ReactNode } from 'react';
import { PixelText } from '../pixel';
import { cn } from '../../lib/utils';
import { PIXEL_VAR, SWATCH, type PixelColor } from '../../lib/colors';

interface SectionHeaderProps {
  id: string;
  kicker: string;
  title: string;
  color: PixelColor;
  /** Element used for the title (h1 on standalone pages) */
  as?: 'h1' | 'h2';
  meta?: ReactNode;
  className?: string;
}

/** Kicker label, a box-built title and an optional meta column. */
export function SectionHeader({ id, kicker, title, color, as: Heading = 'h2', meta, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-[clamp(32px,4vw,64px)] flex flex-wrap items-end justify-between gap-6', className)}>
      <div>
        <p className="mb-[18px] flex items-center gap-2.5 font-pixel text-[13px] uppercase">
          <span aria-hidden="true" className={cn('block size-3', SWATCH[color])} />
          {kicker}
        </p>
        <Heading id={id} className="reveal-wipe" style={{ filter: `drop-shadow(5px 5px 0 ${PIXEL_VAR[color]})` }}>
          <PixelText text={title} size="clamp(7px, 1vw, 14px)" />
        </Heading>
      </div>
      {meta && (
        <div className="flex flex-col gap-1.5 font-pixel text-[13px] uppercase text-foreground-secondary md:text-right">
          {meta}
        </div>
      )}
    </div>
  );
}
