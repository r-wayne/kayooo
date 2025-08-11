import { NextRequest, NextResponse } from 'next/server'
import { getExperiences, createExperience } from '@/lib/services/experience'
import { verifyToken } from '@/lib/services/auth'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const experiences = await getExperiences()
    return NextResponse.json({ experiences })
  } catch (error) {
    console.error('Get experiences error:', error)
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
    const requiredFields = ['name', 'duration_mins', 'price', 'currency', 'passenger_limit', 'description']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    const experience = await createExperience(data)
    return NextResponse.json({ experience }, { status: 201 })
  } catch (error) {
    console.error('Create experience error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}