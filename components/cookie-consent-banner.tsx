'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getCookieConsent, setCookieConsent } from '@/lib/cookie-consent'

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const consent = getCookieConsent()
    if (!consent) {
      // Small delay for smooth entrance animation
      const timer = setTimeout(() => {
        setIsVisible(true)
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleConsent = (status: 'accepted' | 'rejected') => {
    setCookieConsent(status)
    setIsAnimating(false)
    // Wait for exit animation before hiding
    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  const handleManagePreferences = () => {
    // For now, this acts as a reject action
    // Can be extended to open a preferences modal
    handleConsent('rejected')
  }

  if (!isVisible) return null

  return (
    <>
      {/* Subtle backdrop */}
      <div
        className={`fixed inset-0 bg-background/20 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Banner */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
        aria-describedby="cookie-consent-description"
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-border bg-card shadow-lg">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                {/* Message */}
                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-card-foreground">
                    We value your privacy
                  </h2>
                  <p
                    id="cookie-consent-description"
                    className="mt-1 text-sm text-muted-foreground leading-relaxed"
                  >
                    We use cookies to enhance your browsing experience, serve
                    personalized content, and analyze our traffic. By clicking
                    &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                    <a
                      href="/privacy-policy"
                      className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                    >
                      Learn more
                    </a>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <button
                    onClick={handleManagePreferences}
                    className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors order-3 sm:order-1"
                    aria-label="Manage cookie preferences"
                  >
                    Manage Preferences
                  </button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConsent('rejected')}
                    className="order-2"
                    aria-label="Reject all cookies"
                  >
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleConsent('accepted')}
                    className="order-1 sm:order-3"
                    aria-label="Accept all cookies"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
