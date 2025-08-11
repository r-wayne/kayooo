const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

if (!process.env.MONGODB_URI) {
  console.error('Please set MONGODB_URI environment variable')
  process.exit(1)
}

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db('kayo')
    
    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kayocharters.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'KayoAdmin123!'
    
    const existingAdmin = await db.collection('admins').findOne({ email: adminEmail })
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      
      await db.collection('admins').insertOne({
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      console.log(`Admin user created: ${adminEmail}`)
    } else {
      console.log('Admin user already exists')
    }
    
    // Seed sample aircraft
    const aircraftCount = await db.collection('aircraft').countDocuments()
    
    if (aircraftCount === 0) {
      const sampleAircraft = [
        {
          title: 'Cessna Citation M2',
          model: 'Citation M2',
          manufacturer: 'Cessna',
          year: 2018,
          price: 4500000,
          currency: 'USD',
          specs: {
            seats: 6,
            range_km: 2593,
            hours: 1200,
            maxAltitude: 12500,
            speed: 740
          },
          description: 'The Citation M2 is the perfect entry-level jet for those stepping up from turboprops or piston aircraft. With its spacious cabin, advanced avionics, and exceptional performance, this aircraft delivers the reliability and efficiency that Cessna is known for.',
          images: [
            'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg',
            'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg'
          ],
          tags: ['light-jet', 'business', 'efficient'],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'King Air 350i',
          model: 'King Air 350i',
          manufacturer: 'Beechcraft',
          year: 2020,
          price: 7800000,
          currency: 'USD',
          specs: {
            seats: 11,
            range_km: 3334,
            hours: 800,
            maxAltitude: 10670,
            speed: 578
          },
          description: 'The King Air 350i sets the standard for twin-turboprop aircraft. Known for its versatility, reliability, and spacious cabin, this aircraft is perfect for both business and leisure travel with unmatched performance in its class.',
          images: [
            'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg',
            'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg'
          ],
          tags: ['turboprop', 'versatile', 'spacious'],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Bell 407 Helicopter',
          model: '407',
          manufacturer: 'Bell',
          year: 2019,
          price: 3200000,
          currency: 'USD',
          specs: {
            seats: 6,
            range_km: 611,
            hours: 600,
            maxAltitude: 6096,
            speed: 246
          },
          description: 'The Bell 407 is a versatile, single-engine helicopter perfect for executive transport, tourism, and utility operations. With its proven reliability and excellent performance, it\'s the ideal choice for helicopter operations in Kenya.',
          images: [
            'https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg',
            'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg'
          ],
          tags: ['helicopter', 'versatile', 'executive'],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      
      await db.collection('aircraft').insertMany(sampleAircraft)
      console.log('Sample aircraft added')
    } else {
      console.log('Aircraft already exist in database')
    }
    
    // Seed sample experiences
    const experienceCount = await db.collection('experiences').countDocuments()
    
    if (experienceCount === 0) {
      const sampleExperiences = [
        {
          name: 'Nairobi City Scenic Tour',
          duration_mins: 30,
          price: 15000,
          currency: 'KES',
          passenger_limit: 3,
          description: 'Experience the beauty of Nairobi from above with our scenic helicopter tour. See iconic landmarks including the city center, Uhuru Park, and the stunning contrast between urban development and natural beauty.',
          images: [
            'https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg',
            'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg'
          ],
          features: [
            'Professional pilot guide',
            'Safety briefing included',
            'Photo opportunities',
            'Flexible scheduling'
          ],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Maasai Mara Game Reserve Flight',
          duration_mins: 120,
          price: 85000,
          currency: 'KES',
          passenger_limit: 4,
          description: 'Witness the Great Migration and abundant wildlife of the Maasai Mara from a unique aerial perspective. This unforgettable experience includes game viewing from the air and a landing for ground-based safari.',
          images: [
            'https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg',
            'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg'
          ],
          features: [
            'Aerial game viewing',
            'Ground safari included',
            'Professional guide',
            'Refreshments provided',
            'Wildlife photography opportunities'
          ],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mount Kenya Scenic Flight',
          duration_mins: 90,
          price: 65000,
          currency: 'KES',
          passenger_limit: 3,
          description: 'Soar around Africa\'s second-highest peak and marvel at the dramatic landscapes, glacial valleys, and pristine wilderness of Mount Kenya National Park.',
          images: [
            'https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg',
            'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg'
          ],
          features: [
            'Mountain aerial tour',
            'Glacier viewing',
            'National park flyover',
            'Professional commentary',
            'Weather permitting guarantee'
          ],
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      
      await db.collection('experiences').insertMany(sampleExperiences)
      console.log('Sample experiences added')
    } else {
      console.log('Experiences already exist in database')
    }
    
    // Create indexes for better performance
    await db.collection('aircraft').createIndex({ available: 1, createdAt: -1 })
    await db.collection('experiences').createIndex({ available: 1, createdAt: -1 })
    await db.collection('inquiries').createIndex({ status: 1, createdAt: -1 })
    await db.collection('admins').createIndex({ email: 1 }, { unique: true })
    
    console.log('Database seeded successfully!')
    
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

seed()