import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import type { Config } from "@react-router/dev/config"
import { renderOgImage, type OgCard } from "./scripts/og-image"
import { allProjects } from "./src/data/projects"
import { posts } from "./src/data/posts"
import { site } from "./src/data/site"
import { levelInfo } from "./src/lib/levels"
import { ogImagePath, SITE_URL } from "./src/lib/seo"

// Keeps "A · B" together when a line wraps
const dotted = (items: string[]) => items.join(" · ")

/** Every pre-rendered page and the social card drawn for it */
const pages: { path: string; card: OgCard }[] = [
  {
    path: "/",
    card: { kicker: `Player 01 · ${site.role}`, title: "I build interfaces that feel alive", subtitle: site.location },
  },
  {
    path: "/projects",
    card: { kicker: `Level select · ${allProjects.length} levels`, title: "All levels", subtitle: "Client work and experiments" },
  },
  {
    path: "/blog",
    card: { kicker: "Dev log", title: "Log", subtitle: "Notes on frontend, design-to-code and AI tools" },
  },
  ...allProjects.map((project) => {
    const { label, isProfessional } = levelInfo(project)
    return {
      path: `/projects/${project.slug}`,
      card: {
        kicker: `${label} · ${isProfessional ? "Professional" : "Experiment"}`,
        title: project.title,
        subtitle: project.summary,
      },
    }
  }),
  ...posts.map((post, i) => ({
    path: `/blog/${post.slug}`,
    card: { kicker: `MSG ${String(i + 1).padStart(3, "0")} · ${post.date}`, title: post.title, subtitle: dotted(post.tags) },
  })),
]

const paths = pages.map((page) => page.path)

export default {
  appDirectory: "src",
  // Static hosting: every known route is rendered to HTML at build time,
  // anything else falls back to the client router (404 page).
  ssr: false,
  prerender: paths,
  routeDiscovery: { mode: "initial" },
  async buildEnd({ reactRouterConfig }) {
    const clientDir = join(reactRouterConfig.buildDirectory, "client")

    const urls = paths
      .map((path) => {
        const priority = path === "/" ? "1.0" : path.split("/").length > 2 ? "0.6" : "0.8"
        return `  <url>\n    <loc>${SITE_URL}${path === "/" ? "/" : path}</loc>\n    <priority>${priority}</priority>\n  </url>`
      })
      .join("\n")
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    await writeFile(join(clientDir, "sitemap.xml"), xml)

    await Promise.all(
      pages.map(async ({ path, card }) => {
        const file = join(clientDir, ogImagePath(path))
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, await renderOgImage(card))
      }),
    )
    console.log(`✓ ${pages.length} social cards written to ${clientDir}/og`)
  },
} satisfies Config
