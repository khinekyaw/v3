import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Link, type LinkProps } from "react-router-dom" // Import Link types
import { cn } from "../../lib/utils"

// We create a union type: it can be a standard Button OR a Link
interface BaseProps {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  children: ReactNode
  leftIcon?: ReactNode
}

// Combine our props with either HTML Button props or Router Link props
type ButtonProps = BaseProps &
  (
    | ({ to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ to: string } & LinkProps)
  )

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  leftIcon,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-80",
    outline:
      "border border-border bg-transparent text-foreground-secondary hover:bg-secondary",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm leading-5",
    md: "px-5 py-2.5 text-sm leading-5",
    lg: "px-6 py-3 text-base leading-6",
  }

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className,
  )

  // Content shared by both Button and Link
  const content = (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
    </>
  )

  // If "to" exists, render as a Link
  if ("to" in props && props.to) {
    return (
      <Link className={combinedClassName} {...(props as LinkProps)}>
        {content}
      </Link>
    )
  }

  // Otherwise, render as a standard button
  return (
    <button
      className={combinedClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}
