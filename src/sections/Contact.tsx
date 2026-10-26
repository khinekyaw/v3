import { useEffect, useState } from "react"
import { Container } from "../components/layout"
import { PixelSprite, PixelText } from "../components/pixel"
import { PIXEL_CYCLE, PIXEL_VAR } from "../lib/colors"
import { site } from "../data/site"

function Countdown() {
  const [count, setCount] = useState(9)

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setCount((c) => (c <= 0 ? 9 : c - 1)), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div aria-hidden="true" className="flex flex-col gap-3 text-pixel-yellow md:items-end">
      <p className="font-pixel text-[13px] uppercase">Continue?</p>
      <PixelText text={String(count)} size="clamp(6px, 0.8vw, 11px)" label={false} />
    </div>
  )
}

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="dot-grid-night relative overflow-hidden bg-night py-[clamp(64px,8vw,128px)] text-night-foreground"
    >
      <Container className="relative">
        <div className="mb-8 md:absolute md:top-0 md:right-[clamp(16px,3.4vw,48px)] md:mb-0">
          <Countdown />
        </div>
        <p className="mb-[18px] flex items-center gap-2.5 font-pixel text-[13px] uppercase">
          <span aria-hidden="true" className="block size-3 bg-pixel-yellow" />
          Stage 04 — Contact
        </p>
        <h2 id="contact-title" className="text-pixel-orange" style={{ filter: "drop-shadow(8px 8px 0 var(--color-pixel-blue))" }}>
          <PixelText text="SAY HI!" size="clamp(8px, 1.8vw, 26px)" charClassName="animate-hop" stagger={0.07} />
        </h2>
        <p className="mt-7 animate-blink font-pixel text-[14px] uppercase text-pixel-yellow">Insert coin to continue ▸</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-3.5 inline-block border-b-[6px] border-pixel-orange text-[clamp(28px,5.4vw,78px)] leading-[1.1] font-bold tracking-[-0.03em] [overflow-wrap:anywhere] text-night-foreground hover:text-pixel-orange"
        >
          {site.email}
        </a>
        <div className="mt-10 flex flex-wrap items-center gap-3.5">
          <a className="px-btn px-btn-night" href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a className="px-btn px-btn-night" href={site.social.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <p className="ml-2 font-pixel text-[13px] uppercase text-night-muted">{site.location} · GMT+7</p>
        </div>
        <div aria-hidden="true" className="mt-[72px] flex animate-march gap-7">
          {PIXEL_CYCLE.map((color) => (
            <PixelSprite key={color} name="invader" color={PIXEL_VAR[color]} cell="5px" />
          ))}
        </div>
      </Container>
    </section>
  )
}
