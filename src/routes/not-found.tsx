import type { Route } from "./+types/not-found"
import { GameOver } from "../components/GameOver"
import { seo } from "../lib/seo"

export const meta: Route.MetaFunction = ({ location }) =>
  seo({ title: "Page not found", path: location.pathname, noindex: true })

export default function NotFound() {
  return <GameOver />
}
