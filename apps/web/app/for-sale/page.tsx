export const dynamic = 'force-dynamic'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plane, Users, Clock, Gauge } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getAircraft } from '@/lib/services/aircraft'
import { formatCurrency } from '@ui/lib/utils'

export default async function ForSalePage() {
  const aircraft = await getAircraft()

  return (
    <div className="min-h-screen bg-luxury-pearl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-luxury-black to-luxury-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold luxury-heading mb-6">
            Aircraft <span className="gold-text">For Sale</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto text-gray-300">
            Discover our curated collection of premium aircraft, from light jets to luxury helicopters. 
            Each aircraft is meticulously maintained and certified to the highest standards.
          </p>
        </div>
      </section>

      {/* Aircraft Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {aircraft.length === 0 ? (
            <div className="text-center py-16">
              <Plane className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold luxury-heading mb-2">No Aircraft Available</h3>
              <p className="text-gray-600">Check back soon for new listings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aircraft.map((item) => (
                <Card key={item._id} className="overflow-hidden group hover:scale-105 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.images[0] || "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-gold-gradient text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.year}
                    </div>
                    <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {item.manufacturer}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <CardTitle className="mb-3 text-xl">{item.title}</CardTitle>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gold-500" />
                        <span>{item.specs.seats} seats</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gold-500" />
                        <span>{item.specs.hours.toLocaleString()}h</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gauge className="w-4 h-4 text-gold-500" />
                        <span>{item.specs.range_km.toLocaleString()}km</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Plane className="w-4 h-4 text-gold-500" />
                        <span>{item.specs.speed || 'N/A'} km/h</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold gold-text">
                        {item.price ? formatCurrency(item.price, item.currency) : 'Contact for Price'}
                      </div>
                      <Link href={`/for-sale/${item._id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gold-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-6">
            Ready to Own Your Dream Aircraft?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Our aviation experts are here to help you find the perfect aircraft for your needs. 
            From financing to maintenance, we provide comprehensive support throughout your ownership journey.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="bg-white text-gold-600 hover:bg-gray-100">
              Contact Our Sales Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}