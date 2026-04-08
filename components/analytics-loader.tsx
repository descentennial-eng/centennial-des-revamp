'use client'

import { useEffect, useRef } from 'react'
import { getCookieConsent } from '@/lib/cookie-consent'
import { injectRedditPixel } from '@/lib/reddit-pixel'
import { injectMetaPixel } from '@/lib/meta-pixel'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const GTM_ID = 'GTM-W66J25N7'
const GTAG_SCRIPT_ID = 'gtag-script'
const GTAG_INIT_ID = 'gtag-init'
const GTM_SCRIPT_ID = 'gtm-script'
const ANALYTICS_LOADED_FLAG = '__gtagLoaded'
const GTM_LOADED_FLAG = '__gtmLoaded'

function isGtagAlreadyInjected(): boolean {
  if (typeof window === 'undefined') return false

  if ((window as any)[ANALYTICS_LOADED_FLAG]) return true

  return Boolean(document.getElementById(GTAG_SCRIPT_ID) || document.getElementById(GTAG_INIT_ID))
}

function isGtmAlreadyInjected(): boolean {
  if (typeof window === 'undefined') return false

  if ((window as any)[GTM_LOADED_FLAG]) return true

  return Boolean(document.getElementById(GTM_SCRIPT_ID))
}

function injectGtm(gtmId: string) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  if (isGtmAlreadyInjected()) return

  // GTM head script
  const script = document.createElement('script')
  script.id = GTM_SCRIPT_ID
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `
  // Insert as high in <head> as possible
  document.head.insertBefore(script, document.head.firstChild)

  // GTM noscript iframe (for users with JS disabled)
  const noscript = document.createElement('noscript')
  noscript.id = 'gtm-noscript'
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  noscript.appendChild(iframe)
  // Insert immediately after opening <body>
  document.body.insertBefore(noscript, document.body.firstChild)

  ;(window as any)[GTM_LOADED_FLAG] = true
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

      // Load Google Tag Manager
      if (GTM_ID) {
        injectGtm(GTM_ID)
      }

      // Collect all available tracking IDs for gtag
      const trackingIds: string[] = []
      if (GA_TRACKING_ID) trackingIds.push(GA_TRACKING_ID)
      if (GOOGLE_ADS_ID) trackingIds.push(GOOGLE_ADS_ID)

      if (trackingIds.length > 0) {
        const [primaryId, ...additionalIds] = trackingIds
        injectGtag(primaryId, additionalIds)
      }

      // Load Reddit Pixel
      injectRedditPixel()

      // Load Meta Pixel
      injectMetaPixel()
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
