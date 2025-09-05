"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { LiveDemo } from "@/components/live-demo"
import { Showcase } from "@/components/showcase"
// import { CTA } from "@/components/cta"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-semibold tracking-tight">LANE.AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Live demo
            </a>
            <a href="#showcase" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Showcase
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline">
              <a href="#demo">Try demo</a>
            </Button>
            <Button asChild>
              <a href="#showcase">Get started</a>
            </Button>
          </div>
        </div>
      </header>

      <Hero />

      <Features />

      <HowItWorks />

      <LiveDemo />

      <Showcase />

      {/* <CTA /> */}

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} LANE.AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
              Docs
            </a>
            <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
              Pricing
            </a>
            <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
