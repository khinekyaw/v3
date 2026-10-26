import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react"
import { cn } from "../../lib/utils"

// Box sizes (CSS px) while resolving; one step past the last shows the original
const BLOCKS = [16, 8, 4]
const STEP_MS = 70
// Color levels per channel at the coarsest step, for a reduced retro palette
const COLOR_LEVELS = 6
const VIDEO_FRAME_MS = 66

interface PixelMediaProps {
  /** An image or video that fills this box with object-fit: cover */
  children: ReactNode
  /** Show the untouched media regardless of hover */
  showOriginal?: boolean
  className?: string
}

function posterize(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const image = ctx.getImageData(0, 0, width, height)
  const data = image.data
  const step = 255 / (COLOR_LEVELS - 1)
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.round(data[i] / step) * step
    data[i + 1] = Math.round(data[i + 1] / step) * step
    data[i + 2] = Math.round(data[i + 2] / step) * step
  }
  ctx.putImageData(image, 0, 0)
}

/**
 * Covers an image or video with a box-pixelated copy drawn on a canvas.
 * Hover or focus resolves it back to the original in a few hard steps.
 */
export function PixelMedia({ children, showOriginal = false, className }: PixelMediaProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reveal = showOriginal || hovered || focused
  const revealRef = useRef(reveal)

  useEffect(() => {
    revealRef.current = reveal
  }, [reveal])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const source = wrap?.querySelector<HTMLImageElement | HTMLVideoElement>("video, img")
    const ctx = canvas?.getContext("2d")
    const small = document.createElement("canvas")
    const smallCtx = small.getContext("2d", { willReadFrequently: true })
    if (!wrap || !canvas || !source || !ctx || !smallCtx) return

    const isVideo = source instanceof HTMLVideoElement
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches
    let step = 0
    let drawnStep = -1
    let lastStepAt = 0
    let lastVideoDraw = 0
    let frame = 0
    let visible = true

    const ready = () =>
      source instanceof HTMLVideoElement ? source.readyState >= 2 : source.complete && source.naturalWidth > 0

    const draw = () => {
      if (step >= BLOCKS.length || !ready()) return
      const width = wrap.clientWidth
      const height = wrap.clientHeight
      if (!width || !height) return

      const dpr = window.devicePixelRatio || 1
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
      }

      // Crop the source the same way object-fit: cover does
      const mediaWidth = source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth
      const mediaHeight = source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight
      const scale = Math.max(width / mediaWidth, height / mediaHeight)
      const cropWidth = width / scale
      const cropHeight = height / scale

      const cols = Math.max(1, Math.ceil(width / BLOCKS[step]))
      const rows = Math.max(1, Math.ceil(height / BLOCKS[step]))
      small.width = cols
      small.height = rows
      smallCtx.drawImage(
        source,
        (mediaWidth - cropWidth) / 2,
        (mediaHeight - cropHeight) / 2,
        cropWidth,
        cropHeight,
        0,
        0,
        cols,
        rows,
      )
      if (step === 0) posterize(smallCtx, cols, rows)

      ctx.imageSmoothingEnabled = false
      ctx.drawImage(small, 0, 0, canvas.width, canvas.height)
      drawnStep = step
    }

    const loop = (now: number) => {
      const target = revealRef.current ? BLOCKS.length : 0
      if (step !== target && (reduceMotion || now - lastStepAt >= STEP_MS)) {
        step = reduceMotion ? target : step + Math.sign(target - step)
        lastStepAt = now
      }
      canvas.style.opacity = step >= BLOCKS.length ? "0" : "1"

      const videoPlaying = source instanceof HTMLVideoElement && !source.paused
      if (step !== drawnStep || (videoPlaying && now - lastVideoDraw >= VIDEO_FRAME_MS)) {
        lastVideoDraw = now
        draw()
      }
      if (visible) frame = requestAnimationFrame(loop)
    }

    const redraw = () => {
      drawnStep = -1
    }
    source.addEventListener(isVideo ? "loadeddata" : "load", redraw)

    const resizeObserver = new ResizeObserver(redraw)
    resizeObserver.observe(wrap)

    const intersection = new IntersectionObserver(([entry]) => {
      const wasVisible = visible
      visible = entry.isIntersecting
      if (visible && !wasVisible) frame = requestAnimationFrame(loop)
    })
    intersection.observe(wrap)

    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      source.removeEventListener(isVideo ? "loadeddata" : "load", redraw)
      resizeObserver.disconnect()
      intersection.disconnect()
    }
  }, [])

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
  }

  return (
    <div
      ref={wrapRef}
      className={cn("relative isolate", className)}
      onPointerEnter={(e) => e.pointerType !== "touch" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
    >
      {children}
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-1 size-full" />
    </div>
  )
}
