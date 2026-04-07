"use client"

import { AnimateOnScroll } from "./animate-on-scroll"
import { ArrowRight } from "lucide-react"

export function VideoSection() {
  return (
    <section id="video" aria-labelledby="video-heading" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            See It In Action
          </p>
          <h2 id="video-heading" className="text-balance text-center text-3xl font-bold text-foreground md:text-4xl">
            Experience Digital Marketing Excellence
          </h2>
        </AnimateOnScroll>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 md:items-center ">
          {/* Video Embed */}
          <AnimateOnScroll animation="fade-in-up" delay={100} className="h-full">
            <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-card" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://player.vimeo.com/video/1180894389?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute top-0 left-0 w-full h-full"
                title="experience-video-2"
              />
            </div>
          </AnimateOnScroll>

          {/* Text Content */}
          <AnimateOnScroll animation="fade-in-up" delay={200} className="h-full">
            <div className="flex h-full flex-col justify-center gap-5">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Level up your marketing game at Centennial College with the Marketing - Digital Engagement Strategy graduate certificate. This two-semester program turns you into a digital pro, covering everything from data and content strategy to paid media through flexible on-campus, hybrid, or evening classes. You'll master tools like Google Ads and Meta Blueprint through hands-on training from industry experts, all while building a serious edge with an optional 4-month co-op.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                The highlight? A Capstone Project where you tackle a real-world business challenge to create portfolio-ready work before you even graduate. Between guest speaker sessions, networking events, and a free CMA membership that fast-tracks you to becoming a Chartered Marketer, you'll be connected to leaders from brands like Google and Mercedes-Benz. It’s the ultimate way to bridge the gap between student and pro.
              </p>
              <div className="mt-2">
                <a
          href="https://www.centennialcollege.ca/programs-courses/full-time/marketing-digital-engagement-strategy"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                >
                  Learn More About Our Program
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
