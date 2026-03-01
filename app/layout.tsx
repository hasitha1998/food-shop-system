import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/AuthProvider'

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
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" toastOptions={{
            style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif' }
          }} />
        </AuthProvider>
      </body>
    </html>
  )
}
