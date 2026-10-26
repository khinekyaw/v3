import type { Route } from "./+types/home"
import { About, Contact, Experiences, Hero, Projects, Quests, Ticker } from "../sections"
import { seo } from "../lib/seo"

export const meta: Route.MetaFunction = () => seo()

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <About />
      <Projects />
      <Experiences />
      <Quests />
      <Contact />
    </>
  )
}
