export type ConsentStatus = 'accepted' | 'rejected' | null

const CONSENT_KEY = 'cookie-consent'

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getCookieConsent(): ConsentStatus {
  if (!isBrowser()) return null

  const value = window.localStorage.getItem(CONSENT_KEY)
  if (value === 'accepted' || value === 'rejected') {
    return value
  }

  return null
}

export function setCookieConsent(status: 'accepted' | 'rejected') {
  if (!isBrowser()) return

  window.localStorage.setItem(CONSENT_KEY, status)
  window.dispatchEvent(new Event('consentUpdated'))
}
