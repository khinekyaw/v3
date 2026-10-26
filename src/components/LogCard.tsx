import { Link } from "react-router"
import type { Post } from "../data/posts"
import { excerpt } from "../lib/seo"
import { cn } from "../lib/utils"

interface LogCardProps {
  post: Post
  /** Label in the corner, e.g. "MSG 001" */
  label: string
  className?: string
}

/** A blog post as a message on an ink panel. */
export function LogCard({ post, label, className }: LogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={cn(
        "group reveal flex flex-col border-[3px] border-night-border bg-night p-7 text-night-foreground shadow-[10px_10px_0_var(--color-pixel-blue)] transition-[transform,box-shadow] duration-100 ease-[steps(2)] hover:[transform:translate(-4px,-4px)] hover:shadow-[14px_14px_0_var(--color-pixel-blue)]",
        className,
      )}
    >
      <p className="flex justify-between gap-4 font-pixel text-[12px] uppercase">
        <span className="text-pixel-orange">{post.date}</span>
        <span className="text-night-muted">{label}</span>
      </p>
      <h3 className="mt-3.5 mb-3.5 text-[clamp(24px,2.4vw,34px)] leading-[1.1] font-bold tracking-[-0.02em]">{post.title}</h3>
      <p className="mb-5 text-[15px] leading-[1.55] text-night-muted">{excerpt(post.content, 180)}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
        {post.tags.map((tag) => (
          <li key={tag} className="border-2 border-night-foreground px-2 py-1 font-pixel text-[12px] uppercase">
            {tag}
          </li>
        ))}
      </ul>
      <span className="mt-6 inline-flex min-h-11 items-center font-pixel text-[13px] uppercase text-pixel-yellow group-hover:underline">
        Read entry ▸
      </span>
    </Link>
  )
}
