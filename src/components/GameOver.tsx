import { Container, Section } from "./layout"
import { InvadersGame } from "./InvadersGame"
import { PixelText } from "./pixel"
import { Button } from "./ui"

/** The 404 screen: big box letters and a round of Space Invaders. */
export function GameOver() {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <p className="mb-6 font-pixel text-[13px] uppercase text-foreground-secondary">Error 404 · Level not found</p>
        <h1 className="text-foreground" style={{ filter: "drop-shadow(6px 6px 0 var(--color-pixel-orange))" }}>
          <PixelText text="GAME OVER" size="clamp(5px, 1.3vw, 14px)" charClassName="animate-drop-in" stagger={0.06} />
        </h1>
        <p className="mt-8 mb-10 max-w-sm text-lg text-foreground-secondary">
          This page doesn't exist. While you're here, fancy defending the planet?
        </p>
        <div className="mb-12 flex w-full justify-center">
          <InvadersGame />
        </div>
        <Button to="/" variant="primary">
          ◂ Back to start
        </Button>
      </Container>
    </Section>
  )
}
