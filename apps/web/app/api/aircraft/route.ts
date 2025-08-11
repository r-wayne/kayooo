import { NextRequest, NextResponse } from 'next/server'
import { getAircraft, createAircraft } from '@/lib/services/aircraft'
import { verifyToken } from '@/lib/services/auth'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    
    const aircraft = await getAircraft(limit ? parseInt(limit) : undefined)
    return NextResponse.json({ aircraft })
  } catch (error) {
    console.error('Get aircraft error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
    
    // Validate required fields
    const requiredFields = ['title', 'model', 'manufacturer', 'year', 'currency', 'specs', 'description']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    const aircraft = await createAircraft(data)
    return NextResponse.json({ aircraft }, { status: 201 })
  } catch (error) {
    console.error('Create aircraft error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}