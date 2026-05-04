# Repository Guidelines

## Styling

- Do not use Tailwind default color utilities such as `text-zinc-*`, `bg-slate-*`, `border-gray-*`, `ring-black`, or `text-white`.
- Use only the project color tokens defined in `src/index.css` under `@theme`.
- Preferred color utilities include `text-foreground`, `text-foreground-secondary`, `text-foreground-tertiary`, `bg-background`, `bg-background-muted`, `bg-background-secondary`, `bg-primary`, `text-primary-foreground`, `bg-secondary`, `text-secondary-foreground`, `border-border`, `border-border-light`, `bg-accent`, `text-accent-foreground`, `bg-success`, `text-success-foreground`, `bg-card`, and `bg-card-hover`.
- If a new color is needed, add it to `src/index.css` first as a named token, then use that token through Tailwind.
