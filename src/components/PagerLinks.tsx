import { Link } from "react-router"

interface PagerItem {
  to: string
  title: string
}

interface PagerLinksProps {
  prev: PagerItem
  next: PagerItem
  /** Noun used in the labels, e.g. "level" or "entry" */
  noun: string
}

/** Previous / next navigation at the end of a detail page. */
export function PagerLinks({ prev, next, noun }: PagerLinksProps) {
  return (
    <nav aria-label={`More ${noun}s`} className="mt-20 grid gap-5 md:grid-cols-2">
      <Link to={prev.to} className="px-card flex flex-col gap-2 p-6 text-foreground">
        <span className="font-pixel text-[12px] uppercase text-foreground-secondary">◂ Prev {noun}</span>
        <span className="text-2xl font-bold tracking-[-0.02em]">{prev.title}</span>
      </Link>
      <Link to={next.to} className="px-card flex flex-col gap-2 p-6 text-foreground md:items-end md:text-right">
        <span className="font-pixel text-[12px] uppercase text-foreground-secondary">Next {noun} ▸</span>
        <span className="text-2xl font-bold tracking-[-0.02em]">{next.title}</span>
      </Link>
    </nav>
  )
}
