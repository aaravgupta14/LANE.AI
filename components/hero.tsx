"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 md:pb-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <motion.h1
              className="text-pretty text-3xl md:text-5xl font-semibold tracking-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Real‑time AI Lane Detection for Safer Driving
            </motion.h1>
            <motion.p
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Detect lane markings with millisecond latency and production‑grade accuracy. Built for dashcams, ADAS, and
              autonomous fleets.
            </motion.p>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Button asChild>
                <Link href="#cta">Start free</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#demo">Watch demo</Link>
              </Button>
            </motion.div>
            <motion.ul
              className="mt-2 grid grid-cols-2 gap-3 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <li>
                • <span className="text-foreground font-medium">15ms</span> avg inference
              </li>
              <li>
                • <span className="text-foreground font-medium">98.2%+</span> IoU on KITTI
              </li>
              <li>• Runs on edge devices</li>
              <li>• Simple SDK integration</li>
            </motion.ul>
          </div>

          {/* Visual mock with subtle motion */}
          <motion.div
            className="relative rounded-xl border border-border overflow-hidden bg-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <Image
              src={"/placeholder.svg?height=640&width=960&query=highway%20dashcam%20frame%20with%20lane%20lines"}
              alt="Highway driving frame with lane lines"
              width={960}
              height={640}
              className="w-full h-auto"
              priority
            />
            {/* Accent bar */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
