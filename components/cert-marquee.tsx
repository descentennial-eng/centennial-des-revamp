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
  const doubled = [...certificationImages, ...certificationImages, ...certificationImages]

  return (
    <section className="relative overflow-hidden border-y border-border py-16">
      <div className="mb-10 px-6">
        <AnimateOnScroll>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Your Digital Certification Portfolio
          </p>
          <h2 className="mt-3 text-balance text-center text-2xl font-bold text-foreground md:text-3xl">
            Graduate with Credentials That Matter
          </h2>
        </AnimateOnScroll>
      </div>


    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10" />
  <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10" />
  <div className="flex min-w-max animate-marquee items-center gap-12 md:gap-16">
    {doubled.map((cert, i) => (
      <div
        key={`${cert.name}-${i}`}
        className="flex shrink-0 items-center justify-center opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-105"
      >
        <img
          src={cert.src}
          alt={cert.name}
          className="h-20 w-auto object-contain md:h-20"
        />
      </div>
    ))}
  </div>
</div>


    </section>
  )
}
