import { NextRequest, NextResponse } from 'next/server'
import { createInquiry, getInquiries } from '@/lib/services/inquiry'
import { sendInquiryEmail } from '@/lib/services/email'
import { verifyToken } from '@/lib/services/auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service_type', 'message']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate service type
    const validServiceTypes = ['purchase', 'charter', 'ride']
    if (!validServiceTypes.includes(data.service_type)) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      )
    }

    const inquiry = await createInquiry(data)
    
    // Send email notification
    try {
      await sendInquiryEmail(inquiry)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      success: true,
      inquiry: {
        id: inquiry._id,
        name: inquiry.name,
        service_type: inquiry.service_type
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Create inquiry error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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

    const { searchParams } = new URL(request.url)
    const statusParam = searchParams.get('status')
    const allowed = ['new', 'contacted', 'closed'] as const
    const status = allowed.includes(statusParam as any) ? (statusParam as typeof allowed[number]) : undefined
    
    const inquiries = await getInquiries(status)
    return NextResponse.json({ inquiries })
  } catch (error) {
    console.error('Get inquiries error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}