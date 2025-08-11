export interface Inquiry {
  _id?: string
  name: string
  email: string
  phone: string
  service_type: 'purchase' | 'charter' | 'ride'
  service_id?: string
  preferred_date?: string
  message: string
  channel: 'email' | 'whatsapp' | 'website'
  status: 'new' | 'contacted' | 'closed'
  createdAt: Date
  updatedAt: Date
}

export interface CreateInquiryData {
  name: string
  email: string
  phone: string
  service_type: 'purchase' | 'charter' | 'ride'
  service_id?: string
  preferred_date?: string
  message: string
  channel?: 'email' | 'whatsapp' | 'website'
}