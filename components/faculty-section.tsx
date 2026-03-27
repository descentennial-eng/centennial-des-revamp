"use client"

import { AnimateOnScroll } from "./animate-on-scroll"

const facultyMembers = [
  {
    name: "Dr. Andrew Ko",
    title: "Program Director & Co-founder",
    image: null, // Placeholder for future image
  },
  {
    name: "Jason Beaulieu",
    title: "Industry Relations & Co-founder",
    image: null, // Placeholder for future image
  },
]

export function FacultySection() {
  return (
    <section className="relative bg-[#4a4a4a] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateOnScroll>
          <h2 className="mb-12 text-balance text-center text-2xl font-bold text-white md:mb-16 md:text-3xl lg:text-4xl">
            Meet the Co-founders of the Program
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {facultyMembers.map((faculty, i) => (
            <AnimateOnScroll
              key={faculty.name}
              animation={i === 0 ? "fade-in-left" : "fade-in-right"}
              delay={200}
            >
              <div className="flex flex-col items-center">
                {/* Image placeholder container */}
                <div className="flex aspect-[4/5] w-full items-center justify-center rounded-lg bg-[#c4c4c4]">
                  {faculty.image ? (
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <span className="text-base text-[#666666] md:text-lg">
                      Faculty Photo
                    </span>
                  )}
                </div>
                
                {/* Name and title */}
                <h3 className="mt-6 text-center text-xl font-semibold text-primary md:text-2xl">
                  {faculty.name}
                </h3>
                <p className="mt-1 text-center text-sm text-white/80 md:text-base">
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
