const META_PIXEL_ID = '1431646421900117'
const META_SCRIPT_ID = 'meta-pixel-script'
const META_LOADED_FLAG = '__metaPixelLoaded'

declare global {
  interface Window {
    fbq?: {
      (...args: unknown[]): void
      callMethod?: (...args: unknown[]) => void
      queue: unknown[]
      loaded: boolean
      version: string
    }
    _fbq?: Window['fbq']
  }
}

function isMetaPixelAlreadyInjected(): boolean {
  if (typeof window === 'undefined') return false

  if ((window as Window)[META_LOADED_FLAG as keyof Window]) return true

  return Boolean(document.getElementById(META_SCRIPT_ID))
}

export function injectMetaPixel() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  if (isMetaPixelAlreadyInjected()) return

  // Meta Pixel base code
  ;(function (f: Window, b: Document, e: string, v: string) {
    if (f.fbq) return
    const n = (f.fbq = function (...args: unknown[]) {
      if (n.callMethod) {
        n.callMethod.apply(n, args)
      } else {
        n.queue.push(args)
      }
    } as Window['fbq'])
    if (!f._fbq) f._fbq = n
    n!.queue = []
    n!.loaded = true
    n!.version = '2.0'
    const t = b.createElement(e) as HTMLScriptElement
    t.id = META_SCRIPT_ID
    t.async = true
    t.src = v
    const s = b.getElementsByTagName(e)[0]
    s.parentNode?.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  // Initialize pixel and track PageView
  window.fbq?.('init', META_PIXEL_ID)
  window.fbq?.('track', 'PageView')

  // Add noscript fallback image
  const noscript = document.createElement('noscript')
  noscript.id = 'meta-pixel-noscript'
  const img = document.createElement('img')
  img.height = 1
  img.width = 1
  img.style.display = 'none'
  img.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`
  noscript.appendChild(img)
  document.body.appendChild(noscript)

  ;(window as Window & { [key: string]: boolean })[META_LOADED_FLAG] = true
}

/**
 * Track a Meta Pixel event
 * @param eventName - The event name to track (e.g., 'Lead', 'CompleteRegistration', 'Purchase')
 * @param eventData - Optional event data
 */
export function trackMetaEvent(eventName: string, eventData?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.fbq) return

  if (eventData) {
    window.fbq('track', eventName, eventData)
  } else {
    window.fbq('track', eventName)
  }
}
