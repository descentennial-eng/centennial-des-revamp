'use client'

import { useEffect, useRef } from 'react'
import { getCookieConsent } from '@/lib/cookie-consent'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
const GTAG_SCRIPT_ID = 'gtag-script'
const GTAG_INIT_ID = 'gtag-init'
const ANALYTICS_LOADED_FLAG = '__gtagLoaded'

function isGtagAlreadyInjected(): boolean {
  if (typeof window === 'undefined') return false

  if ((window as any)[ANALYTICS_LOADED_FLAG]) return true

  return Boolean(document.getElementById(GTAG_SCRIPT_ID) || document.getElementById(GTAG_INIT_ID))
}

function injectGtag(trackingId: string) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  if (isGtagAlreadyInjected()) return

  const script = document.createElement('script')
  script.id = GTAG_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
  document.head.appendChild(script)

  const inline = document.createElement('script')
  inline.id = GTAG_INIT_ID
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    gtag('js', new Date());
    gtag('config', '${trackingId}', { anonymize_ip: true });
  `
  document.head.appendChild(inline)

  ;(window as any)[ANALYTICS_LOADED_FLAG] = true
}

export function AnalyticsLoader() {
  const consentCheckedRef = useRef(false)

  useEffect(() => {
    const shouldLoad = () => {
      const consent = getCookieConsent()
      if (consent === 'accepted' && GA_TRACKING_ID) {
        injectGtag(GA_TRACKING_ID)
      }
    }

    shouldLoad()

    const handleConsentUpdated = () => {
      if (!consentCheckedRef.current) {
        consentCheckedRef.current = true
      }
      shouldLoad()
    }

    window.addEventListener('consentUpdated', handleConsentUpdated)
    return () => window.removeEventListener('consentUpdated', handleConsentUpdated)
  }, [])

  return null
}
