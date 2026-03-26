"use client"

import { AnimateOnScroll } from "./animate-on-scroll"

const certifications = [
  "Google Ads",
  "Google Analytics",
  "Hootsuite",
  "Meta Blueprint",
  "SEO & SEM",
  "Tableau",
  "DV360",
  "Content Strategy",
  "Email Marketing",
  "PPC Platforms",
  "Data Visualization",
  "Mobile Marketing",
]

const certificationLogos = [
  {
    name: "Google Ads",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
      </svg>
    ),
  },
  {
    name: "Meta Blueprint",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#0081FB"/>
      </svg>
    ),
  },
  {
    name: "SEMrush",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FF642D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Hootsuite",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#143059"/>
      </svg>
    ),
  },
]

export function CertMarquee() {
  const doubled = [...certifications, ...certifications]

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

      <div className="flex animate-marquee gap-6">
        {doubled.map((cert, i) => (
          <div
            key={`${cert}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-6 py-3 shadow-sm transition-colors duration-300 hover:border-primary/40"
          >
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="whitespace-nowrap text-sm font-medium text-foreground">
              {cert}
            </span>
          </div>
        ))}
      </div>

      {/* Certification Logos Grid */}
      <div className="mx-auto mt-12 max-w-4xl px-6">
        <AnimateOnScroll animation="fade-in-up" delay={100}>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {certificationLogos.map((logo) => (
              <div
                key={logo.name}
                className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:scale-[1.02]"
              >
                <div className="flex h-16 w-16 items-center justify-center">
                  {logo.icon}
                </div>
                <span className="text-center text-sm font-medium text-muted-foreground">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
