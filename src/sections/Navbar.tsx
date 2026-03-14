import { ArrowUpRight, Moon, Sun } from "lucide-react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { Container } from "../components/layout"
import { useTheme } from "../hooks/useTheme"

function PacmanLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 0C6.268 0 0 6.268 0 14s6.268 14 14 14 14-6.268 14-14L14 14V0Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 bg-background/70 z-10 border-border backdrop-blur-[6px] animate-fade-in-down">
      <Container>
        <nav className="h-25.5 flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <RouterLink
              to="/"
              className="text-foreground hover:opacity-70 transition-opacity"
            >
              <PacmanLogo />
            </RouterLink>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <RouterLink to="/projects" className={`text-sm transition-colors ${pathname.startsWith('/projects') ? 'text-foreground font-medium' : 'text-foreground-secondary hover:text-foreground'}`}>
                Projects
              </RouterLink>
              <RouterLink to="/blog" className={`text-sm transition-colors ${pathname.startsWith('/blog') ? 'text-foreground font-medium' : 'text-foreground-secondary hover:text-foreground'}`}>
                Blog
              </RouterLink>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Connect Button */}
            <a
              href="mailto:thekhinekyaw@gmail.com"
              className="px-4 py-2 rounded-full border border-border flex items-center gap-2 hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="text-sm font-medium text-foreground">
                Let's Connect
              </span>
              <ArrowUpRight size={12} className="text-foreground" />
            </a>

            {/* Theme Toggle */}
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
          </div>
        </nav>
      </Container>
    </header>
  )
}
