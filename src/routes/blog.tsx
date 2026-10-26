import type { Route } from "./+types/blog"
import { BackLink } from "../components/BackLink"
import { Container, Section, SectionHeader } from "../components/layout"
import { LogCard } from "../components/LogCard"
import { posts } from "../data/posts"
import { seo } from "../lib/seo"

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Blog",
    description: "Notes from Khine Kyaw Tun on frontend work, turning designs into code and building with AI tools.",
    path: "/blog",
  })

export default function Blog() {
  return (
    <Section labelledBy="blog-title">
      <Container>
        <BackLink to="/" label="Back to start" />
        <SectionHeader
          as="h1"
          id="blog-title"
          kicker="Dev log"
          title="LOG"
          color="blue"
          meta={<span>{String(posts.length).padStart(3, "0")} entries</span>}
        />
        <div className="grid items-start gap-[clamp(24px,3vw,40px)] md:grid-cols-2">
          {posts.map((post, i) => (
            <LogCard key={post.slug} post={post} label={`MSG ${String(i + 1).padStart(3, "0")}`} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
