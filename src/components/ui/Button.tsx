import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Link, type LinkProps } from "react-router"
import { cn } from "../../lib/utils"

interface BaseProps {
  variant?: "primary" | "outline" | "night"
  children: ReactNode
}

// A standard button OR a router link
type ButtonProps = BaseProps &
  (
    | ({ to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ to: string } & LinkProps)
  )

const variants = {
  primary: "px-btn px-btn-primary",
  outline: "px-btn",
  night: "px-btn px-btn-night",
}

export function Button({ variant = "outline", children, className, ...props }: ButtonProps) {
  const combinedClassName = cn(variants[variant], className)

  if ("to" in props && props.to) {
    return (
      <Link className={combinedClassName} {...(props as LinkProps)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={combinedClassName} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
