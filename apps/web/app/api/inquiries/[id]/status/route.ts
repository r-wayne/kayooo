import { NextRequest, NextResponse } from 'next/server'
import { updateInquiryStatus } from '@/lib/services/inquiry'
import { verifyToken } from '@/lib/services/auth'

export const runtime = 'nodejs'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { status } = await request.json()
    
    // Validate status
    const validStatuses = ['new', 'contacted', 'closed']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const success = await updateInquiryStatus(params.id, status)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Inquiry not found or update failed' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update inquiry status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}