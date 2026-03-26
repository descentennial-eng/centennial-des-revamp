"use client"

import Image from "next/image"
import { DesLogo } from "./des-logo"

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
              href="https://www.centennialdigitalstrategy.ca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit DES Program website (opens in new tab)"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Program Website
            </a>
            <a
              href="https://www.instagram.com/explore/tags/DESCentennial/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View DES Centennial on Instagram (opens in new tab)"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Instagram
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
