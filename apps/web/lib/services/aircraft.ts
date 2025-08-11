import { getDatabase } from '@db/lib/mongodb'
import { Aircraft, CreateAircraftData } from '@db/models/Aircraft'
import { ObjectId } from 'mongodb'

type DbAircraft = Omit<Aircraft, '_id'> & { _id: ObjectId }

export async function getAircraft(limit?: number): Promise<Aircraft[]> {
  const db = await getDatabase()
  const collection = db.collection<DbAircraft>('aircraft')

  const query = limit ? { available: true } : {}
  const options: { sort: Record<string, 1 | -1>; limit?: number } = { sort: { createdAt: -1 } }
  if (limit) options.limit = limit
  
  const aircraftDocs = await collection.find(query, options).toArray()
  return aircraftDocs.map((doc: DbAircraft) => ({ ...doc, _id: doc._id.toString() }))
}

export async function getAircraftById(id: string): Promise<Aircraft | null> {
  const db = await getDatabase()
  const collection = db.collection<DbAircraft>('aircraft')
  const aircraft = await collection.findOne({ _id: new ObjectId(id) })
  
  if (!aircraft) return null
  return { ...aircraft, _id: aircraft._id.toString() }
}

export async function createAircraft(data: CreateAircraftData): Promise<Aircraft> {
  const db = await getDatabase()
  const collection = db.collection<DbAircraft>('aircraft')
  const now = new Date()
  
  const aircraftData: Omit<DbAircraft, '_id'> = {
    ...data,
    available: data.available ?? true,
    createdAt: now,
    updatedAt: now,
  }
  
  const result = await collection.insertOne(aircraftData as any)
  return { ...aircraftData, _id: result.insertedId.toString() }
}

export async function updateAircraft(id: string, data: Partial<CreateAircraftData>): Promise<boolean> {
  const db = await getDatabase()
  const collection = db.collection<DbAircraft>('aircraft')
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  )
  
  return result.modifiedCount > 0
}

export async function deleteAircraft(id: string): Promise<boolean> {
  const db = await getDatabase()
  const collection = db.collection<DbAircraft>('aircraft')
  const result = await collection.deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}