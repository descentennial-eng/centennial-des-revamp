"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimateOnScroll } from "./animate-on-scroll"

interface BioContent {
  headline: string
  intro: string
  bullets: { title: string; description: string }[]
}

interface Cofounder {
  name: string
  title: string
  image: string
  bio?: BioContent
}

const cofounders: Cofounder[] = [
  {
    name: "Dr. Andrew Ko",
    title: "Industry Relations & Co-founder",
    image: "/images/dr-andrew-ko.jpg",
    bio: {
      headline: "Digital Strategist | Behavioural Data Specialist | Marketing Educator",
      intro:
        "A digital strategist who refuses to let data be boring; Andrew spends his time at the intersection of human psychology and marketing innovation. With over 15 years of experience leading data-driven strategy across startups, agencies, and global brands, he specializes in turning cold analytics into genuine human experiences.",
      bullets: [
        {
          title: "The Founder's Edge",
          description:
            "He co-founded Personalyze, a behavioural intelligence platform that successfully raised $3.0M CAD from OpenOcean, one of Europe's leading data-focused VCs—bringing a high-stakes, venture-backed perspective to everything he builds.",
        },
        {
          title: "The Classroom Architect",
          description:
            "As a veteran educator, Andrew ditches the theory for \"day-one\" readiness. He leads student teams through the trenches of real campaign development and programmatic platforms, ensuring every project is portfolio-ready and industry-vetted.",
        },
        {
          title: "Beyond the Dashboard",
          description:
            "When he isn't decoding consumer behavior, he's a former DJ and music producer, dog parent to Mochi, and the founder of The Data Human—a project dedicated to making the digital world feel a little more personal.",
        },
      ],
    },
  },
  {
    name: "Prof. Jason Beaulieu",
    title: "Program Director & Co-founder",
    image: "/images/prof-jason-beaulieu.jpg",
    bio: {
      headline: "Digital Engagement Strategy Lead | Professor | AI Strategist",
      intro:
        "Part digital architect, part classroom disruptor, Jason Beaulieu has spent over 20 years proving that \"business as usual\" is a myth. From his days at top-tier agencies like HUGE, SapientNitro, and Isobar to managing million-dollar revenue streams at Virgin Mobile, Jason has seen the digital landscape shift from the front lines. (Fun fact: he even helped launch North America's very first Facebook social game).",
      bullets: [
        {
          title: "Empowering the Next Generation",
          description:
            "As a Program Lead at Centennial College, Jason swaps dry lectures for high-stakes simulations and live projects that bridge the gap between the classroom and the boardroom.",
        },
        {
          title: "Expertise You Can Trust",
          description:
            "Whether consulting for global CPG brands or guiding faculty through the AI \"wild west,\" he brings a unique mix of deep technical chops (certified by IBM, Google, and Meta) and an executive edge from the Kellogg School of Management.",
        },
        {
          title: "The Bottom Line",
          description:
            "He knows how the tech works, how the money moves, and exactly how to teach you to do the same—helping you navigate the next wave of digital transformation without the corporate fluff.",
        },
      ],
    },
  },
]

function FacultyCard({ faculty, index }: { faculty: Cofounder; index: number }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const handleToggle = () => {
    if (faculty.bio) {
      setIsOverlayVisible((prev) => !prev)
    }
  }

  return (
    <AnimateOnScroll
      animation={index === 0 ? "fade-in-left" : "fade-in-right"}
      delay={200}
    >
      <div className="flex flex-col items-center">
        {/* Faculty Photo with Overlay */}
        <div
          className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-[#c4c4c4] transition-transform duration-300 ease-in-out hover:scale-[1.02]"
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleToggle()
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={isOverlayVisible}
          aria-label={
            faculty.bio
              ? `View bio for ${faculty.name}`
              : faculty.name
          }
        >
          <Image
            src={faculty.image}
            alt={faculty.name}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Bio Overlay */}
          {faculty.bio && (
            <div
              className={`absolute inset-0 flex flex-col bg-gradient-to-t from-black/95 via-black/85 to-black/70 p-6 backdrop-blur-sm transition-all duration-300 ease-in-out ${
                isOverlayVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
              }`}
            >
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/30">
                <h4 className="text-lg font-bold text-white">
                  {faculty.name}
                </h4>
                <p className="mt-1 text-sm font-medium text-primary">
                  {faculty.bio.headline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/90">
                  {faculty.bio.intro}
                </p>

                <ul className="mt-4 space-y-3">
                  {faculty.bio.bullets.map((bullet) => (
                    <li key={bullet.title} className="text-sm text-white/90">
                      <span className="font-semibold text-white">
                        {bullet.title}:
                      </span>{" "}
                      {bullet.description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fade effect at bottom */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          {/* Hover hint for desktop when no bio visible */}
          {faculty.bio && !isOverlayVisible && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
              <span className="text-xs font-medium text-white">
                View Bio
              </span>
            </div>
          )}
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
  )
}

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
            <FacultyCard key={faculty.name} faculty={faculty} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
