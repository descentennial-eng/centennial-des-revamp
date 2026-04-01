"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

const testimonials = [
  {
    quote:
      "During the Digital Engagement Strategy program, I was challenged and grew both personally and professionally. The program exceeded my expectations by combining practical, hands-on learning with strong professor support and networking opportunities. I gained invaluable skills that prepared me for a successful career in digital marketing.",
    name: "Yashita Atmaram",
    role: "Marketing - DES Graduate",
  },
  {
    quote:
      "The DES program gave me the confidence and skills to transition into a new career. The hands-on projects and real-world case studies helped me build a portfolio that impressed employers. I landed my dream job within weeks of graduating.",
    name: "Natalie Baxter",
    role: "Digital Marketing Coordinator at RBC",
  },
  {
    quote:
      "What sets this program apart is the focus on practical application. Every course taught me something I could immediately use in my work. The connections I made with industry professionals opened doors I never expected.",
    name: "Diego Ramos",
    role: "Sponsorship Manager at VolleyballSource Canada",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const changeSlide = useCallback((newIndex: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(newIndex)
    
    // After fade out completes, update the display content
    setTimeout(() => {
      setDisplayIndex(newIndex)
    }, 300)
    
    // After full transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }, [isAnimating])

  const goToNext = useCallback(() => {
    changeSlide((currentIndex + 1) % testimonials.length)
  }, [currentIndex, changeSlide])

  const goToPrevious = useCallback(() => {
    changeSlide((currentIndex - 1 + testimonials.length) % testimonials.length)
  }, [currentIndex, changeSlide])

  const goToSlide = (index: number) => {
    if (index === currentIndex) return
    changeSlide(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      goToNext()
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, goToNext])

  const displayedTestimonial = testimonials[displayIndex]

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-primary py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Two Column Layout - Header integrated into left column */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
          {/* Left Column - Header + Testimonial Slider */}
          <AnimateOnScroll animation="fade-in-left" delay={100}>
            <div
              className="space-y-8"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Header Content */}
              <div className="text-center lg:text-left">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
                  Alumni Voices
                </p>
                <h2
                  id="testimonials-heading"
                  className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl"
                >
                  Their Words, Your Future
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80 lg:mx-0">
                  Real stories from graduates who turned their digital marketing
                  ambitions into thriving careers.
                </p>
              </div>

              {/* Testimonial Content with Smooth Crossfade Animation */}
              <div 
                ref={containerRef}
                className="relative min-h-[200px] md:min-h-[180px]"
              >
                <div
                  className={`transition-all duration-500 ease-out ${
                    isAnimating 
                      ? "opacity-0 translate-y-2" 
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <blockquote className="text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                    &ldquo;{displayedTestimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 space-y-1">
                    <p className="text-lg font-semibold text-primary-foreground">
                      {displayedTestimonial.name}
                    </p>
                    <p className="text-sm text-primary-foreground/70">
                      {displayedTestimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                {/* Arrow Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={goToPrevious}
                    disabled={isAnimating}
                    aria-label="Previous testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all hover:bg-primary-foreground/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={isAnimating}
                    aria-label="Next testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all hover:bg-primary-foreground/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-6 bg-primary-foreground"
                          : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Column - Vertical Video */}
          <AnimateOnScroll animation="fade-in-right" delay={200}>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[280px]">
                {/* Video Label Overlay */}
                <div className="absolute left-3 top-3 z-10 rounded-full bg-primary-foreground/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                  Student Story
                </div>
                {/* Video Container with 9:16 aspect ratio */}
                <div className="aspect-[9/16] w-full overflow-hidden rounded-xl bg-primary-foreground/10 shadow-lg">
                  <iframe
                    src="https://player.vimeo.com/video/1179289517?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
                    className="h-full w-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Alumni Social"
                  />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
