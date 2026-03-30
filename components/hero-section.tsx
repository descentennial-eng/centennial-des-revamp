"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowRight } from "lucide-react"
import { DesLogo } from "./des-logo"

const words = ["Strategists.", "Innovators.", "Leaders.", "Creators."]

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section aria-label="Introduction to Digital Engagement Strategy program" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(hsl(68 68% 49% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(68 68% 49% / 0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-8 flex justify-center">
          <DesLogo size="lg" className="items-center" />
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">
            Now Accepting Applications for September 2026
          </span>
        </div>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-7xl">
          We Build Digital{" "}
          <span className="relative inline-block">
            <span
              aria-live="polite"
              aria-atomic="true"
              className={`inline-block text-primary transition-all duration-400 ${
                isAnimating
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {words[wordIndex]}
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Centennial College&apos;s Digital Engagement Strategy program transforms
          ambitious professionals into career-ready digital marketing experts.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#testimonials"
            className="group rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
          >
            Hear From Our Alumni
            <ArrowRight size={16} className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#program"
            className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
          >
            Explore the Program
          </a>
        </div>
      </div>

      <a
        href="#stats"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll down"
      >
        <ArrowDown className="animate-bounce" size={24} />
      </a>
    </section>
  )
}
