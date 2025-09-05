"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const steps = [
  {
    title: "1. Frame ingest",
    desc: "Capture frames from camera or dashcam pipeline.",
  },
  {
    title: "2. Preprocess",
    desc: "Calibrate, undistort, and normalize for consistent input.",
  },
  {
    title: "3. Inference",
    desc: "Run the lane detection model in real time on device or server.",
  },
  {
    title: "4. Postprocess",
    desc: "Fit geometries and emit stable polylines with confidence scores.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="py-14 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="text-pretty text-2xl md:text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            A clear, production‑ready pipeline with tight latency bounds.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
          <motion.ol
            className="space-y-4"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {steps.map((s) => (
              <li key={s.title} className="rounded-lg border border-border p-4 bg-card">
                <h3 className="font-medium">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </motion.ol>

          <motion.div
            className="relative rounded-xl border border-border overflow-hidden bg-card"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={"/placeholder.svg?height=560&width=880&query=pipeline%20diagram%20for%20lane%20detection"}
              alt="Lane detection pipeline diagram"
              width={880}
              height={560}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 inset-x-0 h-1 bg-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
