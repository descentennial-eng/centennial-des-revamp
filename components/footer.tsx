"use client"

import Image from "next/image"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { DesLogo } from "./des-logo"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-5">
            <DesLogo size="sm" />
            <div className="h-10 w-px bg-border" />
            <div className="flex items-center gap-3">
              <Image
                src="/images/centennial-logo.png"
                alt="Centennial College"
                width={36}
                height={36}
                className="rounded-md"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">Centennial College</p>
                <p className="text-xs text-muted-foreground">
                  The Business School
                </p>
              </div>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://www.centennialcollege.ca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Centennial College website (opens in new tab)"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Centennial College
            </a>
            <a
              href="https://www.instagram.com/des.centennial?igsh=d3l0MDEzbHZ3OWp5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow DES Centennial on Instagram (opens in new tab)"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@des.centennial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow DES Centennial on TikTok (opens in new tab)"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/des-centennial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with DES Centennial on LinkedIn (opens in new tab)"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61584426223203&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow DES Centennial on Facebook (opens in new tab)"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Centennial College. All rights reserved.
            Post Graduate Program - Marketing: Digital Engagement Strategy.
          </p>
        </div>
      </div>
    </footer>
  )
}
