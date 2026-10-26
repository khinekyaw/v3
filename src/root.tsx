import type { ReactNode } from "react"
import { Links, Meta, Scripts, isRouteErrorResponse } from "react-router"
import { Analytics } from "@vercel/analytics/react"
import "@fontsource-variable/space-grotesk"
import "@fontsource/silkscreen/latin-400.css"
import "@fontsource/silkscreen/latin-700.css"
import "./index.css"
import type { Route } from "./+types/root"
import { Layout as SiteLayout } from "./components/layout"
import { AnimatedOutlet } from "./components/AnimatedOutlet"
import { ThemeProvider } from "./components/ThemeProvider"
import { LogoMark, PixelText } from "./components/pixel"
import { site } from "./data/site"
import { SITE_URL } from "./lib/seo"

// Icons are drawn from the logo grid by scripts/generate-icons.ts
export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon-180x180.png" },
  { rel: "manifest", href: "/site.webmanifest" },
]

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: SITE_URL,
  jobTitle: site.role,
  sameAs: Object.values(site.social),
}

// Runs before first paint: dark mode never flashes light, and the "js" class
// lets reveal animations hide content only when scripts are running
const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))d.classList.add("dark")}catch(e){}})()`

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#E7E7EE" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#17171C" media="(prefers-color-scheme: dark)" />
        <meta name="author" content={site.name} />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <SiteLayout>
        <AnimatedOutlet />
      </SiteLayout>
      <Analytics />
    </ThemeProvider>
  )
}

export function HydrateFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LogoMark cell={8} className="animate-blink" />
    </div>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const status = isRouteErrorResponse(error) ? error.status : 500
  const message = isRouteErrorResponse(error)
    ? error.statusText || "Something went wrong."
    : error instanceof Error
      ? error.message
      : "Something went wrong."

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-4">
      <p className="font-pixel text-[13px] uppercase text-foreground-secondary">Error {status}</p>
      <h1>
        <PixelText text="GAME OVER" size="clamp(6px, 1.4vw, 12px)" />
      </h1>
      <p className="text-lg text-foreground-secondary">{message}</p>
      <a className="px-btn" href="/">
        ◂ Back to start
      </a>
    </main>
  )
}
