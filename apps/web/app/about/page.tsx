import React from 'react'
import Image from 'next/image'
import { Shield, Award, Users, Globe, Clock, Heart } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-luxury-black to-luxury-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold luxury-heading mb-6">
                About <span className="gold-text">Kayo Charters</span>
              </h1>
              <p className="text-xl leading-relaxed mb-8 text-gray-300">
                For over two decades, we've been Kenya's premier aviation company, delivering unparalleled excellence in aircraft sales, private charters, and helicopter experiences. Our commitment to safety, luxury, and personalized service sets us apart in the aviation industry.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold gold-text mb-2">20+</div>
                  <div className="text-sm text-gray-400">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gold-text mb-2">500+</div>
                  <div className="text-sm text-gray-400">Satisfied Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gold-text mb-2">50+</div>
                  <div className="text-sm text-gray-400">Aircraft Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gold-text mb-2">1000+</div>
                  <div className="text-sm text-gray-400">Flight Hours</div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg"
                alt="Modern aviation facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-luxury-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg"
                alt="Aircraft maintenance hangar"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold luxury-heading mb-6">
                Our <span className="gold-text">Story</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2003 by aviation enthusiast David Kayo, Kayo Charters began with a simple vision: to provide Kenya with world-class aviation services that rival the best in the world. What started as a small charter operation has grown into East Africa's most trusted name in premium aviation.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                From our state-of-the-art facility at Wilson Airport, we've facilitated countless journeys, connected businesses across continents, and created memories that last a lifetime. Our growth is built on the foundation of trust, safety, and an unwavering commitment to excellence.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we proudly serve clients from across Kenya and beyond, offering everything from aircraft acquisition consulting to bespoke helicopter experiences over the stunning landscapes of East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-4">
              Our <span className="gold-text">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Safety Excellence</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Safety is never negotiable. We maintain the highest standards in aircraft maintenance, pilot training, and operational procedures.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Premium Quality</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  From our aircraft selection to customer service, we deliver only the finest quality in every aspect of our business.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Client Focus</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Every client is unique, and we tailor our services to meet your specific needs and exceed your expectations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Global Standards</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  We adhere to international aviation standards and best practices, ensuring world-class service delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Reliability</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  When you choose Kayo Charters, you can trust that we'll deliver on our promises, on time, every time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="mb-4">Team Excellence</CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Our experienced team of aviation professionals brings decades of combined expertise to serve you better.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-luxury-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-4">
              Our <span className="gold-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals who make excellence possible every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <Image
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                    alt="David Kayo - Founder & CEO"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="mb-2">David Kayo</CardTitle>
                <p className="text-gold-600 font-semibold mb-4">Founder & CEO</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A passionate aviator with over 25 years in the industry. David's vision and leadership have made Kayo Charters Kenya's premier aviation company.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <Image
                    src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg"
                    alt="Sarah Mitchell - Head of Operations"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="mb-2">Sarah Mitchell</CardTitle>
                <p className="text-gold-600 font-semibold mb-4">Head of Operations</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sarah ensures every flight operation runs smoothly. With her attention to detail and operational expertise, safety and efficiency are always guaranteed.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <Image
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
                    alt="James Omondi - Chief Pilot"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="mb-2">James Omondi</CardTitle>
                <p className="text-gold-600 font-semibold mb-4">Chief Pilot</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  With over 15,000 flight hours, James leads our pilot team with unmatched skill and professionalism, ensuring every journey is safe and smooth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold luxury-heading mb-4">
            Certified <span className="gold-text">Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Our commitment to excellence is recognized by leading aviation authorities and industry organizations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-70">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-semibold">KCAA Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-semibold">ISO 9001</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-3">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-semibold">IATA Member</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-semibold">NBAA Member</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}