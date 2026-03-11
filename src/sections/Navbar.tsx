import { ArrowUpRight, Moon, Sun } from "lucide-react"
import { Container } from "../components/layout"
import { Link } from "../components/ui"
import { useTheme } from "../hooks/useTheme"

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 bg-background/70 z-10 border-border backdrop-blur-[6px] animate-fade-in-down">
      <Container>
        <nav className="h-25.5 flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <span className="text-xl font-bold text-foreground leading-7 hover:opacity-70 transition-opacity cursor-pointer">
              SimpFolio
            </span>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#about" variant="nav">
                About
              </Link>
              <Link href="#achievement" variant="nav">
                Achievement
              </Link>
              <Link href="#blog" variant="nav">
                Blog
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Connect Button */}
            <button className="px-4 py-2 rounded-full border border-border flex items-center gap-2 hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              <span className="text-sm font-medium text-foreground">
                Let's Connect
              </span>
              <ArrowUpRight size={12} className="text-foreground" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary hover:rotate-12 active:scale-95 transition-all duration-200"
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
