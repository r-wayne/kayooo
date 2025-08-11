import { getDatabase } from '@db/lib/mongodb'
import { Admin } from '@db/models/Admin'
import bcrypt from 'bcryptjs'
import jwt, { type Secret, type SignOptions, type JwtPayload } from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

type DbAdmin = Omit<Admin, '_id'> & { _id: ObjectId }

const JWT_SECRET: Secret = (process.env.JWT_SECRET || 'dev-secret-key') as Secret

export async function validateAdmin(email: string, password: string): Promise<Admin | null> {
  const db = await getDatabase()
  const collection = db.collection<DbAdmin>('admins')
  const admin = await collection.findOne({ email })
  
  if (!admin) return null
  
  const isValid = await bcrypt.compare(password, admin.password)
  if (!isValid) return null
  
  return { ...admin, _id: admin._id.toString() }
}

export function generateToken(adminId: string): string {
  const options: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any }
  return jwt.sign({ adminId }, JWT_SECRET, options)
}

export function verifyToken(token: string): { adminId: string } | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & { adminId: string }
    return { adminId: payload.adminId }
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