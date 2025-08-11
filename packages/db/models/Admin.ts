export interface Admin {
  _id?: string
  email: string
  password: string
  name: string
  role: 'admin' | 'manager'
  createdAt: Date
  updatedAt: Date
}

export interface CreateAdminData {
  email: string
  password: string
  name: string
  role?: 'admin' | 'manager'
}