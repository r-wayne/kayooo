'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { generateWhatsAppUrl } from '@ui/lib/utils'

function ContactInner() {
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: 'charter',
    service_id: '',
    preferred_date: '',
    message: ''
  })

  useEffect(() => {
    const service = searchParams.get('service')
    const aircraftId = searchParams.get('aircraft')
    const experienceId = searchParams.get('experience')

    if (service) {
      setFormData(prev => ({
        ...prev,
        service_type: service === 'purchase' ? 'purchase' : service === 'ride' ? 'ride' : 'charter',
        service_id: aircraftId || experienceId || ''
      }))
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', phone: '', service_type: 'charter', service_id: '', preferred_date: '', message: '' })
      } else {
        throw new Error('Failed to submit inquiry')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('There was an error submitting your inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappMessage = "Hello Kayo Charters! I'd like to inquire about your aviation services."
  const whatsappUrl = generateWhatsAppUrl("+254700000000", whatsappMessage)

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-luxury-pearl flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="mb-4">Thank You!</CardTitle>
            <p className="text-gray-600 mb-6">Your inquiry has been submitted successfully. Our team will contact you within 24 hours.</p>
            <div className="space-y-3">
              <Button onClick={() => setIsSubmitted(false)} className="w-full">Submit Another Inquiry</Button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Continue on WhatsApp
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-pearl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-luxury-black to-luxury-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold luxury-heading mb-6">Contact <span className="gold-text">Us</span></h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto text-gray-300">Ready to take flight? Get in touch with our aviation experts to discuss your needs, whether it's purchasing an aircraft, chartering a flight, or booking a helicopter experience.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold luxury-heading mb-8">Get in <span className="gold-text">Touch</span></h2>
              
              <div className="space-y-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-gold-500 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-gray-600">+254 700 000 000</p>
                        <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-gold-500 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-gray-600">info@kayocharters.com</p>
                        <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-gold-500 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-gray-600">Wilson Airport</p>
                        <p className="text-gray-600">Langata Road, Nairobi</p>
                        <p className="text-gray-600">Kenya</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gold-gradient text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="w-8 h-8" />
                    <div>
                      <h3 className="font-semibold mb-2">WhatsApp Us</h3>
                      <p className="mb-4 opacity-90">
                        Get instant responses to your questions via WhatsApp
                      </p>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="bg-white text-gold-600 hover:bg-gray-100">
                          Start WhatsApp Chat
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-8">
                  <CardTitle className="mb-6">Send us a Message</CardTitle>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+254 700 000 000"
                        />
                      </div>
                      <div>
                        <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-2">
                          Service Type *
                        </label>
                        <select
                          id="service_type"
                          name="service_type"
                          required
                          value={formData.service_type}
                          onChange={handleInputChange}
                          className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-1"
                        >
                          <option value="charter">Private Charter</option>
                          <option value="purchase">Aircraft Purchase</option>
                          <option value="ride">Helicopter Experience</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date (Optional)
                      </label>
                      <Input
                        id="preferred_date"
                        name="preferred_date"
                        type="date"
                        value={formData.preferred_date}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your requirements, preferred dates, or any questions you have..."
                        rows={5}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ContactInner />
    </Suspense>
  )
}