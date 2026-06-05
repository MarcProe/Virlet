import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Virlet - Instagram Creator Analytics',
  description: 'Modern analytics dashboard for Instagram creators',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning style={{ backgroundColor: '#111827', color: '#f9fafb' }}>
      <body className={inter.className} style={{ backgroundColor: '#111827', color: '#f9fafb', minHeight: '100vh' }}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
