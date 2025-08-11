import { getDatabase } from '@db/lib/mongodb'
import { Experience, CreateExperienceData } from '@db/models/Experience'
import { ObjectId } from 'mongodb'

type DbExperience = Omit<Experience, '_id'> & { _id: ObjectId }

export async function getExperiences(): Promise<Experience[]> {
  const db = await getDatabase()
  const collection = db.collection<DbExperience>('experiences')
  const experiences = await collection
    .find({ available: true })
    .sort({ createdAt: -1 })
    .toArray()
  
  return experiences.map((doc: DbExperience) => ({ ...doc, _id: doc._id.toString() }))
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const db = await getDatabase()
  const collection = db.collection<DbExperience>('experiences')
  const experience = await collection.findOne({ _id: new ObjectId(id) })
  
  if (!experience) return null
  return { ...experience, _id: experience._id.toString() }
}

export async function createExperience(data: CreateExperienceData): Promise<Experience> {
  const db = await getDatabase()
  const collection = db.collection<DbExperience>('experiences')
  const now = new Date()
  
  const experienceData: Omit<DbExperience, '_id'> = {
    ...data,
    available: data.available ?? true,
    createdAt: now,
    updatedAt: now,
  }
  
  const result = await collection.insertOne(experienceData as any)
  return { ...experienceData, _id: result.insertedId.toString() }
}

export async function updateExperience(id: string, data: Partial<CreateExperienceData>): Promise<boolean> {
  const db = await getDatabase()
  const collection = db.collection<DbExperience>('experiences')
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  )
  
  return result.modifiedCount > 0
}

export async function deleteExperience(id: string): Promise<boolean> {
  const db = await getDatabase()
  const collection = db.collection<DbExperience>('experiences')
  const result = await collection.deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}