"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { trackRedditEvent } from "@/lib/reddit-pixel"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Program", href: "#program" },
  { label: "Careers", href: "#careers" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#cta" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-stretch">
        {/* Left section with logo and nav links */}
        <div className="flex flex-1 items-center justify-between px-6 py-3">
          <a href="#" className="flex items-center" aria-label="Centennial College - Go to homepage">
            {mounted && (
              <Image
                src={resolvedTheme === "dark" ? "/images/logo-dark.jpg" : "/images/logo-light.png"}
                alt="Centennial College"
                width={180}
                height={50}
                className="h-10 w-auto"
                priority
              />
            )}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Apply Now button - full height, outside the padded container */}
        <a
          href="https://www.centennialcollege.ca/programs-courses/full-time/marketing-digital-engagement-strategy"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackRedditEvent('Lead')}
          className="hidden items-center bg-primary px-8 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-primary/90 md:flex"
        >
          Apply Now
        </a>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" role="menu" className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.centennialcollege.ca/programs-courses/full-time/marketing-digital-engagement-strategy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackRedditEvent('Lead')
                setMobileOpen(false)
              }}
              className="mt-2 bg-primary px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-black"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
