"use client"

import { AnimateOnScroll } from "./animate-on-scroll"
import { Rocket, RefreshCw, TrendingUp, Compass } from "lucide-react"
import { cn } from "@/lib/utils"

const personas = [
  {
    icon: Rocket,
    title: "Early Career Professionals",
    description:
      "Aspiring to enter the vibrant, growing field of digital marketing and build a strong foundation.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: RefreshCw,
    title: "Career Changers",
    description:
      "Looking to transition from other fields into marketing with hands-on digital skills.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: TrendingUp,
    title: "Traditional Marketers",
    description:
      "Aiming to expand your skill set with cutting-edge digital marketing capabilities.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Compass,
    title: "Digital Marketers",
    description:
      "Seeking to broaden perspectives on both strategic and tactical aspects of the field.",
    color: "bg-primary/10 text-primary",
  },
]

export function WhoSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Is This You?
          </p>
          <h2 className="text-balance text-center text-3xl font-bold text-foreground md:text-5xl">
            Different Paths,{" "}
            <span className="text-primary">One Digital Future</span>
          </h2>
        </AnimateOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((persona, i) => (
            <AnimateOnScroll key={persona.title} animation="fade-in-up" delay={i * 120}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1">
                <div
                  className={cn(
                    "mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground",
                    persona.color
                  )}
                >
                  <persona.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {persona.title}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                  {persona.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
