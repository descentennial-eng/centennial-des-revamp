const REDDIT_PIXEL_ID = 'a2_ip6251uk3j0x'
const REDDIT_SCRIPT_ID = 'reddit-pixel-script'
const REDDIT_LOADED_FLAG = '__redditPixelLoaded'

declare global {
  interface Window {
    rdt?: {
      (...args: unknown[]): void
      sendEvent?: (...args: unknown[]) => void
      callQueue: unknown[]
    }
  }
}

function isRedditPixelAlreadyInjected(): boolean {
  if (typeof window === 'undefined') return false

  if ((window as Window)[REDDIT_LOADED_FLAG as keyof Window]) return true

  return Boolean(document.getElementById(REDDIT_SCRIPT_ID))
}

export function injectRedditPixel() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  if (isRedditPixelAlreadyInjected()) return

  // Reddit Pixel base code
  ;(function (w: Window, d: Document) {
    if (!w.rdt) {
      const p = (w.rdt = function (...args: unknown[]) {
        if (p.sendEvent) {
          p.sendEvent.apply(p, args)
        } else {
          p.callQueue.push(args)
        }
      } as Window['rdt'])
      p!.callQueue = []
      const t = d.createElement('script')
      t.id = REDDIT_SCRIPT_ID
      t.src = 'https://www.redditstatic.com/ads/pixel.js'
      t.async = true
      const s = d.getElementsByTagName('script')[0]
      s.parentNode?.insertBefore(t, s)
    }
  })(window, document)

  // Initialize pixel and track page visit
  window.rdt?.('init', REDDIT_PIXEL_ID)
  window.rdt?.('track', 'PageVisit')

  ;(window as Window & { [key: string]: boolean })[REDDIT_LOADED_FLAG] = true
}

/**
 * Track a Reddit Pixel event
 * @param eventName - The event name to track (e.g., 'Lead', 'SignUp', 'Purchase')
 * @param eventData - Optional event data
 */
export function trackRedditEvent(eventName: string, eventData?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.rdt) return

  if (eventData) {
    window.rdt('track', eventName, eventData)
  } else {
    window.rdt('track', eventName)
  }
}
