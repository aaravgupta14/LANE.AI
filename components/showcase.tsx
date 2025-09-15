"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const items = [
  { title: "Night driving", src: "/indian-city-road-night-driving-with-street-lights-.jpg" },
  { title: "Rain & glare", src: "/indian-highway-monsoon-rain-wet-roads-with-visible.jpg" },
  { title: "Daylight", src: "/indian-highway-daylight-clear-weather-with-lane-ma.jpg" },
]

export function Showcase() {
  return (
    <section id="showcase" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="text-pretty text-2xl md:text-3xl font-semibold tracking-tight">Built for real roads</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Stress‑tested across challenging conditions to maintain stable guidance.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.figure
              key={it.title}
              className="rounded-xl border border-border overflow-hidden bg-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            >
              <Image
                src={it.src || "/placeholder.svg"}
                alt={it.title}
                width={720}
                height={480}
                className="w-full h-auto"
              />
              <figcaption className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium">{it.title}</span>
                <span className="text-xs text-muted-foreground">High stability</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
