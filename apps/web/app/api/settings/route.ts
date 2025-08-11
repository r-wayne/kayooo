import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/services/auth'
import { getDatabase } from '@db/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await getDatabase()
    const settings = await db.collection('settings').findOne({ type: 'company' })
    
    return NextResponse.json({ 
      settings: settings || {
        company_email: process.env.FROM_EMAIL || '',
        whatsapp_number: process.env.WHATSAPP_NUMBER || '',
        phone: '',
        address: '',
        social_links: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        }
      }
    })
  } catch (error) {
    console.error('Get settings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const db = await getDatabase()
    
    const result = await db.collection('settings').updateOne(
      { type: 'company' },
      { 
        $set: { 
          ...data, 
          type: 'company',
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update settings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}