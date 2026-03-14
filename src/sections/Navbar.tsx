import { useState, useEffect } from "react"
import { ArrowUpRight, Menu, X, Moon, Sun } from "lucide-react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { Container } from "../components/layout"
import { useTheme } from "../hooks/useTheme"

function PacmanLogo() {
  return (
    <span className="pacman-logo-parent">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
        className="pacman-logo"
      >
        <circle cx="14" cy="14" r="14" fill="currentColor" />
      </svg>
    </span>
  )
}

const navLinks = [
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
]

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

  return (
    <header className="sticky top-0 bg-background/70 z-10 border-border backdrop-blur-[6px] animate-fade-in-down">
      <Container>
        <nav className="h-16 md:h-25.5 flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-8">
            <RouterLink
              aria-label="Logo"
              to="/"
              className="text-foreground hover:opacity-70 transition-opacity"
            >
              <PacmanLogo />
            </RouterLink>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <RouterLink
                  key={link.to}
                  to={link.to}
                  className={`text-sm transition-colors ${pathname.startsWith(link.to) ? "text-foreground font-medium" : "text-foreground-secondary hover:text-foreground"}`}
                >
                  {link.label}
                </RouterLink>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:thekhinekyaw@gmail.com"
              className="hidden sm:flex px-4 py-2 rounded-full border border-border items-center gap-2 hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="text-sm font-medium text-foreground">
                Let's Connect
              </span>
              <ArrowUpRight size={12} className="text-foreground" />
            </a>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full cursor-pointer hover:bg-secondary hover:rotate-12 active:scale-95 transition-all duration-200"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon size={18} className="text-foreground" />
              ) : (
                <Sun size={18} className="text-foreground" />
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full cursor-pointer hover:bg-secondary active:scale-95 transition-all duration-200"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden border-border-light transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-60 border-t" : "max-h-0"
        }`}
      >
        <Container>
          <div className="flex flex-col py-4 gap-1">
            {navLinks.map((link, index) => (
              <RouterLink
                key={link.to}
                to={link.to}
                className={`px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                  mobileOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                } ${
                  pathname.startsWith(link.to)
                    ? "text-foreground font-medium bg-secondary"
                    : "text-foreground-secondary hover:text-foreground hover:bg-secondary"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 75}ms` : "0ms",
                }}
              >
                {link.label}
              </RouterLink>
            ))}
            <a
              href="mailto:thekhinekyaw@gmail.com"
              className={`sm:hidden px-3 py-2.5 rounded-lg text-sm text-foreground-secondary hover:text-foreground hover:bg-secondary transition-all duration-300 flex items-center gap-2 ${
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
              style={{
                transitionDelay: mobileOpen
                  ? `${navLinks.length * 75}ms`
                  : "0ms",
              }}
            >
              Let's Connect
              <ArrowUpRight size={12} />
            </a>
          </div>
        </Container>
      </div>
    </header>
  )
}
