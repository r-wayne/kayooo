export interface Aircraft {
  _id?: string
  title: string
  model: string
  manufacturer: string
  year: number
  price?: number
  currency: string
  specs: {
    seats: number
    range_km: number
    hours: number
    maxAltitude?: number
    speed?: number
  }
  description: string
  images: string[]
  tags: string[]
  available: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateAircraftData {
  title: string
  model: string
  manufacturer: string
  year: number
  price?: number
  currency: string
  specs: Aircraft['specs']
  description: string
  images: string[]
  tags: string[]
  available?: boolean
}