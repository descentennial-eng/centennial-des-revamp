"use client"

import { AnimateOnScroll } from "./animate-on-scroll"

const certificationImages = [
  { name: "Google Ads", src: "/certification/google-ads-logo.png" },
  { name: "Google Analytics", src: "/certification/google-analytics.png" },
  { name: "DV360", src: "/certification/googleDV.png" },
  { name: "Hootsuite", src: "/certification/hootsuiteimage.png" },
  { name: "Meta Blueprint", src: "/certification/meta-blueprint.png" },
  { name: "SEMrush", src: "/certification/sem-rush-image.png" },
  { name: "Tableau", src: "/certification/tableaulogo.png" },
]

export function CertMarquee() {
  // Triple the images for seamless infinite scroll (translateX goes to -33.333%)
  const tripled = [...certificationImages, ...certificationImages, ...certificationImages]

  return (
    <section className="relative overflow-hidden border-y border-border py-10 sm:py-12 md:py-16">
      <div className="mb-8 px-4 sm:mb-10 sm:px-6">
        <AnimateOnScroll>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
            Your Digital Certification Portfolio
          </p>
          <h2 className="mt-2 text-balance text-center text-xl font-bold text-foreground sm:mt-3 sm:text-2xl md:text-3xl">
            Graduate with Credentials That Matter
          </h2>
        </AnimateOnScroll>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient overlays - responsive width */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent sm:w-16 md:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent sm:w-16 md:w-24" />
        
        {/* Marquee track */}
        <div className="flex min-w-max animate-marquee items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {tripled.map((cert, i) => (
            <div
              key={`${cert.name}-${i}`}
              className="flex shrink-0 items-center justify-center opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
              <img
                src={cert.src}
                alt={`${cert.name} certification`}
                className="h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-20"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
