import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Kayo Charters - Premium Aviation Services',
  description: 'Luxury aircraft sales, private charters, and helicopter experiences. Premium aviation services in Kenya.',
  keywords: 'aircraft sales, private charters, helicopter tours, luxury aviation, Kenya',
  authors: [{ name: 'Kayo Charters' }],
  openGraph: {
    title: 'Kayo Charters - Premium Aviation Services',
    description: 'Luxury aircraft sales, private charters, and helicopter experiences in Kenya.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-[88px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}