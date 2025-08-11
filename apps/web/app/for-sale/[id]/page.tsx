export const dynamic = 'force-dynamic'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Users, Clock, Gauge, Plane, MapPin, Shield, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getAircraftById } from '@/lib/services/aircraft'
import { formatCurrency, generateWhatsAppUrl } from '@ui/lib/utils'

interface AircraftDetailPageProps {
  params: {
    id: string
  }
}

export default async function AircraftDetailPage({ params }: AircraftDetailPageProps) {
  const aircraft = await getAircraftById(params.id)

  if (!aircraft) {
    notFound()
  }

  const whatsappMessage = `Hello Kayo Charters! I'm interested in the ${aircraft.title} (${aircraft.year}). Could you please provide more details about this aircraft?`
  const whatsappUrl = generateWhatsAppUrl(process.env.WHATSAPP_NUMBER || "+254700000000", whatsappMessage)

  return (
    <div className="min-h-screen bg-luxury-pearl">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/for-sale" className="inline-flex items-center text-gold-600 hover:text-gold-700 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Aircraft Listings
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src={aircraft.images[0] || "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg"}
                alt={aircraft.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {aircraft.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {aircraft.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${aircraft.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aircraft Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="bg-gold-gradient text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {aircraft.year}
                </span>
                <span className="text-gold-600 font-semibold">{aircraft.manufacturer}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold luxury-heading mb-4">
                {aircraft.title}
              </h1>
              <div className="text-3xl font-bold gold-text mb-6">
                {aircraft.price ? formatCurrency(aircraft.price, aircraft.currency) : 'Contact for Price'}
              </div>
            </div>

            {/* Key Specifications */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <CardTitle className="mb-4">Key Specifications</CardTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gold-500" />
                    <div>
                      <div className="font-semibold">{aircraft.specs.seats}</div>
                      <div className="text-sm text-gray-600">Seats</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gold-500" />
                    <div>
                      <div className="font-semibold">{aircraft.specs.hours.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Hours</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gauge className="w-5 h-5 text-gold-500" />
                    <div>
                      <div className="font-semibold">{aircraft.specs.range_km.toLocaleString()} km</div>
                      <div className="text-sm text-gray-600">Range</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Plane className="w-5 h-5 text-gold-500" />
                    <div>
                      <div className="font-semibold">{aircraft.specs.speed || 'N/A'} km/h</div>
                      <div className="text-sm text-gray-600">Max Speed</div>
                    </div>
                  </div>
                  {aircraft.specs.maxAltitude && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gold-500" />
                      <div>
                        <div className="font-semibold">{aircraft.specs.maxAltitude.toLocaleString()} m</div>
                        <div className="text-sm text-gray-600">Max Altitude</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/contact?service=purchase&aircraft=${aircraft._id}`} className="flex-1">
                <Button size="lg" className="w-full">
                  Request Purchase Details
                </Button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Inquiry
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="p-8">
            <CardTitle className="mb-6">About This Aircraft</CardTitle>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {aircraft.description}
              </p>
            </div>
            
            {aircraft.tags.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {aircraft.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Trust Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <CardTitle className="mb-2">Certified Quality</CardTitle>
              <p className="text-gray-600">All aircraft undergo rigorous inspection and certification processes.</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <CardTitle className="mb-2">Expert Support</CardTitle>
              <p className="text-gray-600">Our aviation experts provide comprehensive support throughout your purchase.</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Plane className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <CardTitle className="mb-2">Proven Performance</CardTitle>
              <p className="text-gray-600">Each aircraft comes with detailed maintenance records and performance history.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}