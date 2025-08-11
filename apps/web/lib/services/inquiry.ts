import { getDatabase } from '@/../../packages/db/lib/mongodb'
import { Inquiry, CreateInquiryData } from '@/../../packages/db/models/Inquiry'
import { ObjectId } from 'mongodb'

export async function createInquiry(data: CreateInquiryData): Promise<Inquiry> {
  const db = await getDatabase()
  const now = new Date()
  
  const inquiryData = {
    ...data,
    channel: data.channel || 'website',
    status: 'new' as const,
    createdAt: now,
    updatedAt: now,
  }
  
  const result = await db.collection('inquiries').insertOne(inquiryData)
  return { ...inquiryData, _id: result.insertedId.toString() }
}

export async function getInquiries(status?: string): Promise<Inquiry[]> {
  const db = await getDatabase()
  const query = status ? { status } : {}
  const inquiries = await db.collection('inquiries')
    .find(query)
    .sort({ createdAt: -1 })
    .toArray()
  
  return inquiries.map(doc => ({ ...doc, _id: doc._id.toString() }))
}

export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'closed'): Promise<boolean> {
  const db = await getDatabase()
  const result = await db.collection('inquiries').updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } }
  )
  
  return result.modifiedCount > 0
}