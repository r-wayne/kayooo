import { getDatabase } from '@/../../packages/db/lib/mongodb'
import { Experience, CreateExperienceData } from '@/../../packages/db/models/Experience'
import { ObjectId } from 'mongodb'

export async function getExperiences(): Promise<Experience[]> {
  const db = await getDatabase()
  const experiences = await db.collection('experiences')
    .find({ available: true })
    .sort({ createdAt: -1 })
    .toArray()
  
  return experiences.map(doc => ({ ...doc, _id: doc._id.toString() }))
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const db = await getDatabase()
  const experience = await db.collection('experiences').findOne({ _id: new ObjectId(id) })
  
  if (!experience) return null
  return { ...experience, _id: experience._id.toString() }
}

export async function createExperience(data: CreateExperienceData): Promise<Experience> {
  const db = await getDatabase()
  const now = new Date()
  
  const experienceData = {
    ...data,
    available: data.available ?? true,
    createdAt: now,
    updatedAt: now,
  }
  
  const result = await db.collection('experiences').insertOne(experienceData)
  return { ...experienceData, _id: result.insertedId.toString() }
}

export async function updateExperience(id: string, data: Partial<CreateExperienceData>): Promise<boolean> {
  const db = await getDatabase()
  const result = await db.collection('experiences').updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  )
  
  return result.modifiedCount > 0
}

export async function deleteExperience(id: string): Promise<boolean> {
  const db = await getDatabase()
  const result = await db.collection('experiences').deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}