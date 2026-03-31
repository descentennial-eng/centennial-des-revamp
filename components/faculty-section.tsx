"use client"

import Image from "next/image"
import { AnimateOnScroll } from "./animate-on-scroll"

const cofounders = [
  {
    name: "Dr. Andrew Ko",
    title: "Industry Relations & Co-founder",
    image: "/images/dr-andrew-ko.jpg",
  },
  {
    name: "Prof. Jason Beaulieu",
    title: "Program Director & Co-founder",
    image: "/images/prof-jason-beaulieu.jpg",
  },
]

export function FacultySection() {
  return (
    <section className="relative bg-[#4a4a4a] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <h2 className="text-balance text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Meet the Co-founders of the Program
          </h2>
        </AnimateOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {cofounders.map((faculty, i) => (
            <AnimateOnScroll
              key={faculty.name}
              animation={i === 0 ? "fade-in-left" : "fade-in-right"}
              delay={200}
            >
              <div className="flex flex-col items-center">
                {/* Faculty Photo */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#c4c4c4]">
                  <Image
                    src={faculty.image}
                    alt={faculty.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* Name */}
                <h3 className="mt-6 text-center text-xl font-semibold text-primary md:text-2xl">
                  {faculty.name}
                </h3>
                
                {/* Title */}
                <p className="mt-2 text-center text-base text-white/90">
                  {faculty.title}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
