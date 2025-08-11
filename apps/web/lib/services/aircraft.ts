import { getDatabase } from '@/../../packages/db/lib/mongodb'
import { Aircraft, CreateAircraftData } from '@/../../packages/db/models/Aircraft'
import { ObjectId } from 'mongodb'

export async function getAircraft(limit?: number): Promise<Aircraft[]> {
  const db = await getDatabase()
  const query = limit ? { available: true } : {}
  const options = limit ? { limit, sort: { createdAt: -1 } } : { sort: { createdAt: -1 } }
  
  const aircraft = await db.collection('aircraft').find(query, options).toArray()
  return aircraft.map(doc => ({ ...doc, _id: doc._id.toString() }))
}

export async function getAircraftById(id: string): Promise<Aircraft | null> {
  const db = await getDatabase()
  const aircraft = await db.collection('aircraft').findOne({ _id: new ObjectId(id) })
  
  if (!aircraft) return null
  return { ...aircraft, _id: aircraft._id.toString() }
}

export async function createAircraft(data: CreateAircraftData): Promise<Aircraft> {
  const db = await getDatabase()
  const now = new Date()
  
  const aircraftData = {
    ...data,
    available: data.available ?? true,
    createdAt: now,
    updatedAt: now,
  }
  
  const result = await db.collection('aircraft').insertOne(aircraftData)
  return { ...aircraftData, _id: result.insertedId.toString() }
}

export async function updateAircraft(id: string, data: Partial<CreateAircraftData>): Promise<boolean> {
  const db = await getDatabase()
  const result = await db.collection('aircraft').updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  )
  
  return result.modifiedCount > 0
}

export async function deleteAircraft(id: string): Promise<boolean> {
  const db = await getDatabase()
  const result = await db.collection('aircraft').deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}