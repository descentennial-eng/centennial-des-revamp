"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

const faqs = [
  {
    question: "What are the admission requirements for the DES program?",
    answer: "Admission requirements vary, but typically include a post-secondary diploma or degree.",
  },
  {
    question: "Can I work while enrolled in the program?",
    answer: "Yes, students can work part-time while enrolled in the program.",
  },
  {
    question: "What certifications will I earn?",
    answer: "You will gain certifications in tools like Google Ads, Analytics, and more.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Got Questions?
          </p>
          <h2 id="faq-heading" className="text-balance text-center text-3xl font-bold text-foreground md:text-4xl">
            Frequently Asked Questions
          </h2>
        </AnimateOnScroll>

        <div className="mt-12 md:mt-16">
          {faqs.map((faq, index) => (
            <AnimateOnScroll key={index} animation="fade-in-up" delay={index * 100}>
              <div className="border-b border-border">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-primary"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base font-medium text-foreground md:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`ml-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-muted-foreground">
                      {faq.answer}
                    </p>
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
