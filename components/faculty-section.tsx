"use client"

import { AnimateOnScroll } from "./animate-on-scroll"
import { Quote } from "lucide-react"

const facultyQuotes = [
  {
    name: "Dr. Andrew Ko",
    title: "Faculty",
    quote:
      "The biggest takeaway is the ability to think strategically about digital media. And that applies anywhere - agency side, brand side, data roles, or any industry. Strategic thinking will carry students forward wherever they go.",
    initials: "AK",
  },
  {
    name: "Jason Beaulieu",
    title: "Faculty / Program Coordinator",
    quote:
      "If you want to grow fast as a digital marketer in Canada, here's what you actually need: Meta Blueprint, Google Ads Certification, and Google Analytics. Get these three and you'll instantly stand out.",
    initials: "JB",
  },
]

export function FacultySection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Expert Faculty
          </p>
          <h2 className="text-balance text-center text-3xl font-bold text-foreground md:text-4xl">
            Learn From the Best in the Industry
          </h2>
        </AnimateOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {facultyQuotes.map((faculty, i) => (
            <AnimateOnScroll
              key={faculty.name}
              animation={i === 0 ? "fade-in-left" : "fade-in-right"}
              delay={200}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-primary/5" />
                <Quote className="mb-6 h-8 w-8 text-primary/40" />
                <blockquote className="relative text-lg leading-relaxed text-foreground">
                  &ldquo;{faculty.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {faculty.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{faculty.name}</p>
                    <p className="text-sm text-muted-foreground">{faculty.title}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
