import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { AnalyticsLoader } from '@/components/analytics-loader'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Marketing - Digital Engagement Strategy | Hands-On Toronto Certificate with Co-op - Centennial College',
  description:
    'Build real campaigns, earn certifications, and access optional co-op. Job-ready in 12 months - apply for September 2026.',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AnalyticsLoader />
          {children}
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}
