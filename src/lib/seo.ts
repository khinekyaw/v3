import type { MetaDescriptor } from "react-router"

export const SITE_URL = "https://khinekyaw.com"
export const SITE_NAME = "Khine Kyaw Tun"

const DEFAULT_DESCRIPTION =
  "Frontend engineer in Bangkok. I build fast, accessible web apps with React, Next.js and TypeScript."

interface SeoOptions {
  title?: string
  description?: string
  path?: string
  type?: "website" | "article"
  /** Keep the page out of search results */
  noindex?: boolean
}

/**
 * Social preview image for a page, generated at build time by
 * scripts/og-image.ts: "/" → /og.png, "/blog/x" → /og/blog/x.png
 */
export function ogImagePath(path: string) {
  return path === "/" ? "/og.png" : `/og${path}.png`
}

/** Title, description, canonical and social tags for one page. */
export function seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  type = "website",
  noindex = false,
}: SeoOptions = {}): MetaDescriptor[] {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  // Pages without their own card (like 404s) fall back to the default one
  const image = `${SITE_URL}${ogImagePath(noindex ? "/" : path)}`
  const imageAlt = title ? `${title} — ${SITE_NAME}, drawn in pixel boxes` : `${SITE_NAME}, drawn in pixel boxes`

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "robots", content: noindex ? "noindex" : "index, follow" },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt },
  ]
}

/** First prose paragraph of a markdown string, stripped and trimmed for meta descriptions. */
export function excerpt(markdown: string, max = 160) {
  const paragraph =
    markdown
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .find((p) => p && !/^(#|\*|-|\||```|>)/.test(p)) ?? ""
  const text = paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}
