import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/AuthProvider'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Food Shop',
  description: 'Order delicious food via WhatsApp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" toastOptions={{
            style: { borderRadius: '12px', fontFamily: 'var(--font-poppins)' }
          }} />
        </AuthProvider>
      </body>
    </html>
  )
}