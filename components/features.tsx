"use client"

import { motion } from "framer-motion"

const items = [
  {
    title: "Edge‑ready performance",
    desc: "Optimized models run on-device for ultra‑low latency and privacy.",
  },
  {
    title: "Robust under stress",
    desc: "Handles rain, glare, night, and partial occlusions with confidence.",
  },
  {
    title: "Plug‑and‑play SDK",
    desc: "Drop‑in API with concise types and batch support for fleets.",
  },
  {
    title: "Accurate geometry",
    desc: "Sub‑pixel fits and polynomial smoothing for stable guidance.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="text-pretty text-2xl md:text-3xl font-semibold tracking-tight">Designed for reliability</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            A focused feature set that gets your vehicles into production with confidence.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              className="rounded-lg border border-border p-4 bg-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            >
              <div className="h-1 w-8 bg-accent rounded mb-3" />
              <h3 className="font-medium">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
