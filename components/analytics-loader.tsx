'use client'

import { useEffect, useRef } from 'react'
import { getCookieConsent } from '@/lib/cookie-consent'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const GTAG_SCRIPT_ID = 'gtag-script'
const GTAG_INIT_ID = 'gtag-init'
const ANALYTICS_LOADED_FLAG = '__gtagLoaded'

function isGtagAlreadyInjected(): boolean {
  if (typeof window === 'undefined') return false

  if ((window as any)[ANALYTICS_LOADED_FLAG]) return true

  return Boolean(document.getElementById(GTAG_SCRIPT_ID) || document.getElementById(GTAG_INIT_ID))
}

function injectGtag(primaryId: string, additionalIds: string[] = []) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  if (isGtagAlreadyInjected()) return

  const script = document.createElement('script')
  script.id = GTAG_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`
  document.head.appendChild(script)

  // Build config statements for all tracking IDs
  const configStatements = [
    `gtag('config', '${primaryId}', { anonymize_ip: true });`,
    ...additionalIds.map(id => `gtag('config', '${id}');`)
  ].join('\n    ')

  const inline = document.createElement('script')
  inline.id = GTAG_INIT_ID
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    gtag('js', new Date());
    ${configStatements}
  `
  document.head.appendChild(inline)

  ;(window as any)[ANALYTICS_LOADED_FLAG] = true
}

export function AnalyticsLoader() {
  const consentCheckedRef = useRef(false)

  useEffect(() => {
    const shouldLoad = () => {
      const consent = getCookieConsent()
      if (consent !== 'accepted') return

      // Collect all available tracking IDs
      const trackingIds: string[] = []
      if (GA_TRACKING_ID) trackingIds.push(GA_TRACKING_ID)
      if (GOOGLE_ADS_ID) trackingIds.push(GOOGLE_ADS_ID)

      if (trackingIds.length > 0) {
        const [primaryId, ...additionalIds] = trackingIds
        injectGtag(primaryId, additionalIds)
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
