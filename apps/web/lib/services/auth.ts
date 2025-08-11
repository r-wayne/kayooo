import { getDatabase } from '@/../../packages/db/lib/mongodb'
import { Admin } from '@/../../packages/db/models/Admin'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function validateAdmin(email: string, password: string): Promise<Admin | null> {
  const db = await getDatabase()
  const admin = await db.collection('admins').findOne({ email })
  
  if (!admin) return null
  
  const isValid = await bcrypt.compare(password, admin.password)
  if (!isValid) return null
  
  return { ...admin, _id: admin._id.toString() }
}

export function generateToken(adminId: string): string {
  return jwt.sign(
    { adminId },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

export function verifyToken(token: string): { adminId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { adminId: string }
  } catch {
    return null
  }
}

export async function createAdmin(email: string, password: string, name: string): Promise<Admin> {
  const db = await getDatabase()
  const hashedPassword = await bcrypt.hash(password, 12)
  
  const adminData = {
    email,
    password: hashedPassword,
    name,
    role: 'admin' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  const result = await db.collection('admins').insertOne(adminData)
  return { ...adminData, _id: result.insertedId.toString() }
}