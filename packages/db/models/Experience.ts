export interface Experience {
  _id?: string
  name: string
  duration_mins: number
  price: number
  currency: string
  passenger_limit: number
  description: string
  images: string[]
  features: string[]
  available: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateExperienceData {
  name: string
  duration_mins: number
  price: number
  currency: string
  passenger_limit: number
  description: string
  images: string[]
  features: string[]
  available?: boolean
}