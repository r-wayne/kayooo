export const dynamic = 'force-dynamic'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Shield, Users, Trophy, Plane, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/Card'
import { getAircraft } from '@/lib/services/aircraft'
import { formatCurrency, generateWhatsAppUrl } from '@ui/lib/utils'

export default async function HomePage() {
  const featuredAircraft = await getAircraft(3)

  const whatsappMessage = "Hello Kayo Charters! I'm interested in learning more about your premium aviation services."
  const whatsappUrl = generateWhatsAppUrl(process.env.WHATSAPP_NUMBER || "+254700000000", whatsappMessage)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg"
            alt="Luxury aircraft in flight"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold luxury-heading mb-6 animate-fade-in">
            Premium Aviation
            <span className="gold-text block">Excellence</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
            Experience luxury in the skies with our exclusive aircraft sales, private charters, and breathtaking helicopter experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              <Link href="/for-sale" className="flex items-center space-x-2">
                <span>Explore Aircraft</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-luxury-black">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-luxury-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-4">
              Our <span className="gold-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From aircraft acquisition to unforgettable aerial experiences, we deliver excellence at every altitude.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Aircraft Sales</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-6">
                  Discover our curated collection of premium aircraft, from light jets to luxury helicopters, all meticulously maintained and certified.
                </CardDescription>
                <Link href="/for-sale">
                  <Button variant="outline" className="group-hover:bg-gold-500 group-hover:text-white">
                    Browse Aircraft
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Private Charters</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-6">
                  Travel in ultimate comfort and style with our private charter services, tailored to your schedule and destinations.
                </CardDescription>
                <Link href="/contact">
                  <Button variant="outline" className="group-hover:bg-gold-500 group-hover:text-white">
                    Request Charter
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Helicopter Experiences</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-6">
                  Create unforgettable memories with our scenic helicopter tours, perfect for special occasions and breathtaking views.
                </CardDescription>
                <Link href="/experiences">
                  <Button variant="outline" className="group-hover:bg-gold-500 group-hover:text-white">
                    Book Experience
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Aircraft */}
      {featuredAircraft.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-4">
                Featured <span className="gold-text">Aircraft</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our hand-picked selection of premium aircraft, ready for immediate delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredAircraft.map((aircraft) => (
                <Card key={aircraft._id} className="overflow-hidden group hover:scale-105 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={aircraft.images[0] || "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg"}
                      alt={aircraft.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-gold-gradient text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {aircraft.year}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2 text-xl">{aircraft.title}</CardTitle>
                    <CardDescription className="mb-4">
                      {aircraft.manufacturer} • {aircraft.specs.seats} seats • {aircraft.specs.hours.toLocaleString()} hours
                    </CardDescription>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold gold-text">
                        {aircraft.price ? formatCurrency(aircraft.price, aircraft.currency) : 'Contact for Price'}
                      </span>
                      <Link href={`/for-sale/${aircraft._id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/for-sale">
                <Button size="lg">
                  View All Aircraft
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Trust Indicators */}
      <section className="py-20 bg-luxury-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-4">
              Why Choose <span className="gold-text">Kayo Charters</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              With decades of experience and an unwavering commitment to excellence, we're Kenya's trusted aviation partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 luxury-heading">Safety First</h3>
              <p className="text-gray-300">All aircraft undergo rigorous maintenance and safety inspections</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 luxury-heading">Premium Quality</h3>
              <p className="text-gray-300">Only the finest aircraft and highest service standards</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 luxury-heading">Expert Team</h3>
              <p className="text-gray-300">Experienced professionals dedicated to your aviation needs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 luxury-heading">Proven Excellence</h3>
              <p className="text-gray-300">Award-winning service and satisfied clients across Kenya</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gold-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-6">
            Ready to Take Flight?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Whether you're looking to purchase your dream aircraft, charter a private flight, or experience the thrill of a helicopter tour, we're here to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="bg-white text-gold-600 hover:bg-gray-100">
                Get in Touch
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gold-600">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}