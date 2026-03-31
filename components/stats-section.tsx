"use client"

import { useEffect, useRef, useState } from "react"
import { AnimateOnScroll } from "./animate-on-scroll"

const words = ["Innovators", "Strategists", "Creators", "Leaders"]

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = 0
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(start + (end - start) * eased))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 15, suffix: "+", label: "Industry Certifications", description: "Google, HubSpot, Meta and more" },
  { value: 3, suffix: " mo", label: "Optional Co-op Term", description: "Real Canadian market experience" },
  { value: 100, suffix: "%", label: "Hands-On Learning", description: "Real campaigns, real budgets, real results" },
]

export function StatsSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  console.log("[v0] StatsSection rendering, wordIndex:", wordIndex, "isAnimating:", isAnimating)

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
    <section id="stats" aria-labelledby="stats-heading" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Animated headline - above section header */}
        <AnimateOnScroll animation="fade-up">
          <p className="mb-8 text-balance text-center text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
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
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            By the Numbers
          </p>
          <h2 id="stats-heading" className="text-balance text-center text-3xl font-bold text-foreground md:text-4xl">
            Results That Speak for Themselves
          </h2>
        </AnimateOnScroll>

        <div className="mt-16 flex flex-col items-center justify-center gap-12 md:flex-row md:gap-24">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={stat.label} animation="scale-in" delay={i * 120}>
              <div className="text-center">
                <p className="text-5xl font-bold text-primary md:text-6xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 text-sm font-semibold text-foreground">{stat.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
