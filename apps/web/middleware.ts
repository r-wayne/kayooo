import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

async function isTokenValid(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-key')
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    const token = request.cookies.get('auth-token')?.value
    if (!token) return NextResponse.redirect(new URL('/admin/login', request.url))

    const valid = await isTokenValid(token)
    if (!valid) return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: '/admin/:path*' }