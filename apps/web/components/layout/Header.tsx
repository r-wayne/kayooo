'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { cn } from '../../../../packages/ui/lib/utils'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'For Sale', href: '/for-sale' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gold-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-luxury-black text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:+254700000000" className="flex items-center space-x-2 hover:text-gold-400 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+254 700 000 000</span>
            </a>
            <a href="mailto:info@kayocharters.com" className="flex items-center space-x-2 hover:text-gold-400 transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@kayocharters.com</span>
            </a>
          </div>
          <div className="hidden md:block">
            <span>Premium Aviation Services</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl luxury-heading">K</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl luxury-heading">Kayo</span>
              <span className="text-gold-600 text-sm font-medium">Charters</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'font-medium transition-colors duration-200 relative py-2',
                  isActive(item.href) 
                    ? 'text-gold-600' 
                    : 'text-gray-700 hover:text-gold-600'
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-4 py-3 rounded-lg font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-gold-50 text-gold-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}