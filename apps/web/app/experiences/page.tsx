export const dynamic = 'force-dynamic'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, Star, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getExperiences } from '@/lib/services/experience'
import { formatCurrency, generateWhatsAppUrl } from '@ui/lib/utils'

export default async function ExperiencesPage() {
  const experiences = await getExperiences()

  return (
    <div className="min-h-screen bg-luxury-pearl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-luxury-black to-luxury-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold luxury-heading mb-6">
            Helicopter <span className="gold-text">Experiences</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto text-gray-300">
            Discover Kenya from a breathtaking new perspective. Our helicopter experiences offer 
            unforgettable aerial adventures over some of the most stunning landscapes in East Africa.
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {experiences.length === 0 ? (
            <div className="text-center py-16">
              <Star className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold luxury-heading mb-2">No Experiences Available</h3>
              <p className="text-gray-600">Check back soon for exciting helicopter adventures.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((experience) => {
                const whatsappMessage = `Hello Kayo Charters! I'm interested in booking the ${experience.name} helicopter experience. Could you please provide more details?`
                const whatsappUrl = generateWhatsAppUrl(process.env.WHATSAPP_NUMBER || "+254700000000", whatsappMessage)

                return (
                  <Card key={experience._id} className="overflow-hidden group hover:scale-105 transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={experience.images[0] || "https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg"}
                        alt={experience.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-gold-gradient text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {experience.duration_mins} min
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <CardTitle className="mb-3 text-xl">{experience.name}</CardTitle>
                      
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gold-500" />
                          <span>{experience.duration_mins} minutes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gold-500" />
                          <span>Up to {experience.passenger_limit} passengers</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {experience.description}
                      </p>

                      {experience.features && experience.features.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 text-sm">Includes:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {experience.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Star className="w-3 h-3 text-gold-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-2xl font-bold gold-text">
                          {formatCurrency(experience.price, experience.currency)}
                        </div>
                        <div className="text-sm text-gray-500">
                          per flight
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Link href={`/contact?service=ride&experience=${experience._id}`}>
                          <Button size="sm" className="w-full">
                            Book This Experience
                          </Button>
                        </Link>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="w-full">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            WhatsApp Inquiry
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Experiences */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-4">
              Why Choose Our <span className="gold-text">Helicopter Experiences</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Safety, professionalism, and unforgettable memories are at the heart of every flight we offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Expert Pilots</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Our experienced pilots ensure your safety while providing expert commentary about the sights below.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Small Groups</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Intimate group sizes ensure personalized attention and the best possible experience for every passenger.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Flexible Timing</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  We work with your schedule to find the perfect time for your aerial adventure.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Memorable Views</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Experience Kenya's most spectacular landscapes from unique vantage points only accessible by helicopter.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gold-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-6">
            Ready for an Unforgettable Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Book your helicopter experience today and see Kenya like never before. 
            Perfect for special occasions, romantic getaways, or simply treating yourself to something extraordinary.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="bg-white text-gold-600 hover:bg-gray-100">
              Book Your Experience
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}