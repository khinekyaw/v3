import type { Route } from "./+types/post"
import { BackLink } from "../components/BackLink"
import { GameOver } from "../components/GameOver"
import { Container, Section } from "../components/layout"
import { PagerLinks } from "../components/PagerLinks"
import { RichText } from "../components/RichText"
import { posts } from "../data/posts"
import { excerpt, seo } from "../lib/seo"

export const meta: Route.MetaFunction = ({ params }) => {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return seo({ title: "Entry not found", path: `/blog/${params.slug}`, noindex: true })
  return seo({ title: post.title, description: excerpt(post.content), path: `/blog/${post.slug}`, type: "article" })
}

export default function Post({ params }: Route.ComponentProps) {
  const index = posts.findIndex((p) => p.slug === params.slug)
  if (index === -1) return <GameOver />

  const post = posts[index]
  const prev = posts[(index - 1 + posts.length) % posts.length]
  const next = posts[(index + 1) % posts.length]

  return (
    <Section>
      <Container>
        <BackLink to="/blog" label="Back to log" />
        <article className="mx-auto max-w-3xl">
          <header className="mb-12 border-b-[3px] border-border pb-10">
            <p className="mb-5 flex flex-wrap gap-x-4 gap-y-2 font-pixel text-[12px] uppercase">
              <span className="bg-primary px-2 py-[5px] text-primary-foreground">MSG {String(index + 1).padStart(3, "0")}</span>
              <span className="py-[5px] text-foreground-secondary">{post.date}</span>
            </p>
            <h1 className="animate-rise-in text-[clamp(34px,5vw,64px)] leading-[1.02] font-bold tracking-[-0.03em]">{post.title}</h1>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="border-2 border-border bg-card px-2 py-1 font-pixel text-[12px] uppercase">
                  {tag}
                </li>
              ))}
            </ul>
          </header>
          <RichText content={post.content} />
        </article>

        {posts.length > 1 && (
          <PagerLinks
            noun="entry"
            prev={{ to: `/blog/${prev.slug}`, title: prev.title }}
            next={{ to: `/blog/${next.slug}`, title: next.title }}
          />
        )}
      </Container>
    </Section>
  )
}
