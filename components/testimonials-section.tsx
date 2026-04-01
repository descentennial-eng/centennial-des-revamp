"use client"

import { AnimateOnScroll } from "./animate-on-scroll"

const featuredTestimonial = {
  name: "Yashita Atmaram",
  role: "Marketing - DES Graduate",
  quote:
    "During the Digital Engagement Strategy program, I was challenged and grew both personally and professionally. The program exceeded my expectations by combining practical, hands-on learning with strong professor support and networking opportunities. I gained invaluable skills that prepared me for a successful career in digital marketing.",
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-primary py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header - Centered at the top */}
        <AnimateOnScroll>
          <div className="mb-12 text-center lg:mb-0 lg:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
              Alumni Voices
            </p>
            <h2
              id="testimonials-heading"
              className="text-balance text-3xl font-bold text-primary-foreground md:text-5xl"
            >
              Their Words, Your Future
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80 lg:mx-0">
              Real stories from graduates who turned their digital marketing
              ambitions into thriving careers.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Two Column Layout */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-16 lg:grid-cols-[1fr_auto] lg:gap-12">
          {/* Left Column - Featured Testimonial (60-65% width) */}
          <AnimateOnScroll animation="fade-in-left" delay={100}>
            <div className="space-y-6 lg:max-w-2xl">
              <blockquote className="text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </blockquote>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-primary-foreground">
                  {featuredTestimonial.name}
                </p>
                <p className="text-sm text-primary-foreground/70">
                  {featuredTestimonial.role}
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Column - Vertical Video (35-40% width) */}
          <AnimateOnScroll animation="fade-in-right" delay={200}>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px]">
                {/* Video Label Overlay */}
                <div className="absolute left-3 top-3 z-10 rounded-full bg-primary-foreground/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                  Student Story
                </div>
                {/* Video Container with 9:16 aspect ratio */}
                <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl bg-primary-foreground/10 shadow-lg">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster="/images/testimonial-video-poster.jpg"
                  >
                    <source
                      src="/videos/student-testimonial.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
