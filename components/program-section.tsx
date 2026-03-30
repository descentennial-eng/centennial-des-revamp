"use client"

import { useState } from "react"
import { AnimateOnScroll } from "./animate-on-scroll"
import {
  BarChart3,
  Globe,
  Megaphone,
  Users,
  Play,
} from "lucide-react"

const features = [
  {
    icon: Megaphone,
    title: "Real-World Campaigns",
    description:
      "Work with real budgets to build and manage live campaigns from day one.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Strategy",
    description:
      "Master data analysis, visualization, and performance tracking with Tableau and DV360.",
  },
  {
    icon: Globe,
    title: "Global Capstone",
    description:
      "Compete internationally - our 2024 cohort tackled a capstone challenge in Lithuania.",
  },
  {
    icon: Users,
    title: "Career-Ready Co-op",
    description:
      "Optional 6-month co-op gives you real Canadian market experience employers demand.",
  },
]

export function ProgramSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section id="program" aria-labelledby="program-heading" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[500px] w-[500px] rounded-full bg-primary/3 blur-[150px]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            The Program
          </p>
          <h2 id="program-heading" className="text-balance text-center text-3xl font-bold text-foreground md:text-5xl">
            This Isn&apos;t Just a Program.
            <br />
            <span className="text-primary">It&apos;s an Experience.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-muted-foreground">
            A two-semester post-graduate certificate that blends cutting-edge theory
            with real-world practice. Flexible delivery. Industry-driven curriculum.
          </p>
        </AnimateOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto]">
          {/* Feature Cards - Left Side */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((feature, i) => (
              <AnimateOnScroll
                key={feature.title}
                animation={i % 2 === 0 ? "fade-in-left" : "fade-in-right"}
                delay={i * 100}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5">
                  <div className="absolute inset-0 bg-primary/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Video - Right Side */}
          <AnimateOnScroll animation="fade-in-right" delay={200}>
            <div className="mx-auto flex h-full w-[280px] items-stretch lg:mx-0">
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {/* Video Thumbnail with Custom Play Button */}
                {!isPlaying && (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/40 transition-all duration-300 hover:bg-black/30"
                    aria-label="Play video"
                  >
                    {/* Play Button */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/50">
                      <Play size={32} className="ml-1" fill="currentColor" />
                    </div>
                  </button>
                )}
                {/* Video iframe - loads thumbnail initially, plays on click */}
                <iframe
                  src={`https://player.vimeo.com/video/1178509492?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0${isPlaying ? "&autoplay=1" : ""}`}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Prof Jason Vid"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
