import { Link } from "react-router"
import { PixelSprite } from "./pixel"

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group mb-10 inline-flex min-h-11 items-center gap-3 font-pixel text-[13px] uppercase text-foreground-secondary hover:text-foreground md:mb-14"
    >
      <PixelSprite name="arrowLeft" cell="2px" className="group-hover:-translate-x-1" />
      {label}
    </Link>
  )
}
