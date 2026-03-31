"use client"

import { ArrowDown, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Vimeo video URL - replace with actual video URL
  const videoUrl = "https://player.vimeo.com/progressive_redirect/playback/748225739/rendition/720p/file.mp4?loc=external"

  useEffect(() => {
    // Check if mobile on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section aria-label="Introduction to Digital Engagement Strategy program" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Fallback background - always visible, shown when video not loaded or on mobile */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />

      {/* Background video - only on desktop */}
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoLoaded(false)}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-20" : "opacity-0"
            }`}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Dark overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-background/75 to-background/85" />

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

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Main H1 - largest, bold, uppercase */}
        <h1 className="text-balance text-2xl font-bold uppercase leading-none tracking-tight text-foreground sm:text-3xl md:text-5xl lg:text-6xl">
          Marketing – Digital Engagement Strategy Certificate
          <span className="mt-4 block text-base font-medium uppercase tracking-[0.25em] text-foreground/40 sm:mt-5 sm:text-lg md:mt-6 md:text-2xl lg:text-3xl">
            Toronto • Co-op
          </span>
        </h1>

        {/* Subheadline - supporting */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Build real campaigns, earn certifications, and access optional co-op. Job-ready in 12 months – apply for September 2026.
        </p>

        {/* Badge */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">
            Now Accepting Applications for September 2026
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
