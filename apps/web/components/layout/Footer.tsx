import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-luxury-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl luxury-heading">K</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl luxury-heading">Kayo</span>
                <span className="text-gold-400 text-sm font-medium">Charters</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Premium aviation services providing luxury aircraft sales, private charters, and unforgettable helicopter experiences across Kenya.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 luxury-heading text-gold-400">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link href="/for-sale" className="text-gray-300 hover:text-gold-400 transition-colors">Aircraft for Sale</Link></li>
              <li><Link href="/experiences" className="text-gray-300 hover:text-gold-400 transition-colors">Helicopter Experiences</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 luxury-heading text-gold-400">Services</h3>
            <ul className="space-y-3">
              <li><span className="text-gray-300">Aircraft Sales</span></li>
              <li><span className="text-gray-300">Private Charters</span></li>
              <li><span className="text-gray-300">Helicopter Tours</span></li>
              <li><span className="text-gray-300">Aircraft Management</span></li>
              <li><span className="text-gray-300">Maintenance Services</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6 luxury-heading text-gold-400">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">Wilson Airport</p>
                  <p className="text-gray-300">Langata Road, Nairobi</p>
                  <p className="text-gray-300">Kenya</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400" />
                <a href="tel:+254700000000" className="text-gray-300 hover:text-gold-400 transition-colors">
                  +254 700 000 000
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400" />
                <a href="mailto:info@kayocharters.com" className="text-gray-300 hover:text-gold-400 transition-colors">
                  info@kayocharters.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 Kayo Charters. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}