'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

interface Settings { shopName: string; logo?: string; phone: string; whatsapp: string }

export default function Navbar({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Featured', href: '#featured' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.shopName} className="h-10 w-auto" />
            ) : (
              <span className="text-2xl">🍛</span>
            )}
            <span className={`font-bold text-lg transition-colors ${scrolled ? 'text-orange-600' : 'text-white'}`} style={{fontFamily:'Playfair Display,serif'}}>
              {settings.shopName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-orange-500 ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              <span>📱</span> Order via WhatsApp
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col pt-16">
          <nav className="flex flex-col p-6 space-y-2">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700 py-3 border-b border-gray-100 hover:text-orange-500">
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-2xl font-semibold text-base"
            >
              📱 Order via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
