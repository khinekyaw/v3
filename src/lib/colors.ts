export type PixelColor = 'blue' | 'purple' | 'orange' | 'magenta' | 'yellow';

/** Background utility per pixel color */
export const SWATCH: Record<PixelColor, string> = {
  blue: 'bg-pixel-blue',
  purple: 'bg-pixel-purple',
  orange: 'bg-pixel-orange',
  magenta: 'bg-pixel-magenta',
  yellow: 'bg-pixel-yellow',
};

/** CSS color value per pixel color, for SVG fills and filters */
export const PIXEL_VAR: Record<PixelColor, string> = {
  blue: 'var(--color-pixel-blue)',
  purple: 'var(--color-pixel-purple)',
  orange: 'var(--color-pixel-orange)',
  magenta: 'var(--color-pixel-magenta)',
  yellow: 'var(--color-pixel-yellow)',
};

export const PIXEL_CYCLE: PixelColor[] = ['blue', 'orange', 'purple', 'yellow', 'magenta'];

/** Art panel colors for level cards, in order */
export const LEVEL_COLORS: (PixelColor | 'night')[] = ['blue', 'orange', 'purple', 'yellow', 'magenta', 'night'];
