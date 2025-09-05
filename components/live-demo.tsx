"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function LiveDemo() {
  return (
    <section id="demo" className="py-14 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="text-pretty text-2xl md:text-3xl font-semibold tracking-tight">Live demo</h2>
          <p className="mt-3 text-slate-500 leading-relaxed">
            A simulated frame with animated lane overlays to preview the stability of our post‑processing.
          </p>
        </div>
        <div className="mt-8">
          <LaneCanvas />
        </div>
      </div>
    </section>
  )
}

function LaneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const tRef = useRef(0)
  const accentRef = useRef<string>("#00b4d8")

  useEffect(() => {
    // read from CSS variable --accent
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()
    if (accent) accentRef.current = accent

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = "/front-dashcam-highway-frame-with-road-lanes.png"
    imgRef.current = img

    let raf = 0

    const render = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      if (img.complete) {
        ctx.drawImage(img, 0, 0, w, h)
      }

      const t = (tRef.current += 0.02)
      const offset = Math.sin(t) * 6

      drawLane(ctx, w, h, w * 0.36 + offset, w * 0.46 + offset, accentRef.current)
      drawLane(ctx, w, h, w * 0.64 + offset, w * 0.54 + offset, accentRef.current)

      raf = requestAnimationFrame(render)
    }

    img.onload = () => render()
    render()

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      className="rounded-xl border border-border p-3 bg-card"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <canvas
        ref={canvasRef}
        width={720}
        height={400}
        className="w-full h-auto rounded-lg"
        aria-label="Lane detection animated canvas demo"
      />
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Cyan lines show smoothed lane estimates with live confidence blend.
      </p>
    </motion.div>
  )
}

function drawLane(ctx: CanvasRenderingContext2D, w: number, h: number, topX: number, bottomX: number, color: string) {
  ctx.save()
  ctx.lineWidth = 4
  ctx.strokeStyle = color
  ctx.globalAlpha = 0.9
  ctx.beginPath()
  ctx.moveTo(bottomX, h - 10)
  // Quadratic curve up toward horizon
  ctx.quadraticCurveTo((bottomX + topX) / 2, h * 0.55, topX, h * 0.28)
  ctx.stroke()

  // dashed center overlay to suggest confidence ticks
  ctx.setLineDash([8, 8])
  ctx.lineWidth = 2
  ctx.globalAlpha = 0.7
  ctx.stroke()
  ctx.restore()
}
