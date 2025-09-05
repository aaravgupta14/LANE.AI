"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section id="cta" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="rounded-2xl border border-border p-6 md:p-8 bg-card"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-pretty text-xl md:text-2xl font-semibold tracking-tight">
                Ready to ship safer driving?
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Start free, integrate the SDK in minutes, and scale to your fleet with confidence.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button>Get API key</Button>
              <Button variant="outline">View Docs</Button>
            </div>
          </div>
          <div className="mt-6 h-1 w-12 bg-accent rounded" />
        </motion.div>
      </div>
    </section>
  )
}
