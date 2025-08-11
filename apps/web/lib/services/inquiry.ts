import { getDatabase } from '@db/lib/mongodb'
import { Inquiry, CreateInquiryData } from '@db/models/Inquiry'
import { ObjectId, type Filter } from 'mongodb'

type DbInquiry = Omit<Inquiry, '_id'> & { _id: ObjectId }

export async function createInquiry(data: CreateInquiryData): Promise<Inquiry> {
  const db = await getDatabase()
  const collection = db.collection<DbInquiry>('inquiries')
  const now = new Date()
  
  const inquiryData: Omit<DbInquiry, '_id'> = {
    ...data,
    channel: data.channel || 'website',
    status: 'new' as const,
    createdAt: now,
    updatedAt: now,
  }
  
  const result = await collection.insertOne(inquiryData as any)
  return { ...inquiryData, _id: result.insertedId.toString() }
}

export async function getInquiries(status?: 'new' | 'contacted' | 'closed'): Promise<Inquiry[]> {
  const db = await getDatabase()
  const collection = db.collection<DbInquiry>('inquiries')
  const query: Filter<DbInquiry> = status ? { status } : {}
  const inquiries = await collection
    .find(query)
    .sort({ createdAt: -1 })
    .toArray()
  
  return inquiries.map((doc: DbInquiry) => ({ ...doc, _id: doc._id.toString() }))
}

export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'closed'): Promise<boolean> {
  const db = await getDatabase()
  const collection = db.collection<DbInquiry>('inquiries')
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } }
  )
  
  return result.modifiedCount > 0
}