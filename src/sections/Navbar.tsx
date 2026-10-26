import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router"
import { Container, SiteLink } from "../components/layout"
import { LogoMark, PixelSprite } from "../components/pixel"
import { useTheme } from "../hooks/useTheme"
import { cn } from "../lib/utils"
import { site } from "../data/site"
import { navLinks } from "../data/nav"

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [prevPath, setPrevPath] = useState(pathname)

  // Close menu on route change
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    if (mobileOpen) setMobileOpen(false)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const isActive = (to: string) => !to.includes("#") && pathname.startsWith(to)

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-border bg-background">
      <Container>
        <nav aria-label="Primary" className="flex min-h-[76px] items-center justify-between gap-4">
          <Link to="/" aria-label={`${site.name}, home`} className="group flex min-h-11 items-center gap-3.5 text-foreground">
            <LogoMark cell={5} className="group-hover:animate-shake" />
            <span className="flex flex-col gap-1 font-pixel uppercase leading-none">
              <span className="text-[14px] font-bold">{site.name}</span>
              <span className="text-[12px] text-foreground-secondary">{site.role}</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <SiteLink
                  to={link.to}
                  aria-current={isActive(link.to) ? "page" : undefined}
                  className={cn(
                    "block px-3 py-[15px] font-pixel text-[13px] uppercase leading-none text-foreground hover:bg-pixel-orange hover:text-night",
                    isActive(link.to) && "bg-pixel-orange text-night",
                  )}
                >
                  {link.label}
                </SiteLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="grid size-11 place-items-center border-[3px] border-border text-foreground hover:bg-pixel-yellow hover:text-night"
            >
              <PixelSprite name={theme === "light" ? "moon" : "sun"} cell="3px" />
            </button>

            <a
              href={`mailto:${site.email}`}
              className="hidden min-h-11 items-center gap-2.5 bg-night px-4 font-pixel text-[13px] uppercase text-night-foreground shadow-[4px_4px_0_var(--color-pixel-orange)] hover:text-pixel-orange sm:inline-flex"
            >
              <span aria-hidden="true" className="block size-2 animate-blink bg-success" />
              Say hello
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center border-[3px] border-border text-foreground lg:hidden"
            >
              <PixelSprite name={mobileOpen ? "close" : "menu"} cell="3px" />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="border-t-[3px] border-border bg-background lg:hidden"
      >
        <Container>
          <ul className="flex flex-col py-3">
            {navLinks.map((link, index) => (
              <li key={link.to} className="animate-rise-in" style={{ animationDelay: `${index * 60}ms` }}>
                <SiteLink
                  to={link.to}
                  aria-current={isActive(link.to) ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center justify-between border-b-2 border-dashed border-border-light font-pixel text-[15px] uppercase text-foreground",
                    isActive(link.to) && "underline decoration-pixel-orange decoration-4 underline-offset-8",
                  )}
                >
                  {link.label}
                  <span aria-hidden="true">▸</span>
                </SiteLink>
              </li>
            ))}
            <li className="pt-4 sm:hidden">
              <a href={`mailto:${site.email}`} className="px-btn px-btn-primary">
                Say hello
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  )
}
