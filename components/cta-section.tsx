"use client"

import { useState } from "react"
import { AnimateOnScroll } from "./animate-on-scroll"
import { ArrowRight, Mail, Phone, Loader2, CheckCircle } from "lucide-react"

export function CtaSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create mailto link with form data
    const subject = encodeURIComponent(`DES Program Inquiry from ${formData.fullName}`)
    const body = encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )
    
    // Open email client
    window.location.href = `mailto:jbeaulieu@centennialcollege.ca?subject=${subject}&body=${body}`
    
    // Show success state
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ fullName: "", email: "", phone: "", message: "" })
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 500)
  }

  return (
    <section id="cta" aria-labelledby="cta-heading" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll animation="fade-in-up">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
                Ready to Start?
              </p>
              <h2 id="cta-heading" className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Your Digital Marketing Career{" "}
                <span className="text-primary">Starts Here</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Join the next cohort of digital strategists. Two semesters to transform
                your career with hands-on experience, industry certifications, and a
                global network.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="h-12 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="h-12 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="h-12 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Enter your message"
                  className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="group mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={16} />
                    Email Client Opened
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <a
                href="mailto:jbeaulieu@centennialcollege.ca"
                aria-label="Send email to program coordinator"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail size={16} aria-hidden="true" />
                jbeaulieu@centennialcollege.ca
              </a>
              <a
                href="tel:+14168775715"
                aria-label="Call program coordinator"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone size={16} aria-hidden="true" />
                +1-416-877-5715
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
