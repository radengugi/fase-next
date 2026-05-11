import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Update session and refresh auth (handles token rotation)
  const response = await updateSession(request)

  // Get the pathname
  const path = request.nextUrl.pathname

  // Public routes that don't need auth check
  const isPublicRoute = path === '/login' || path === '/register' || path === '/' || path.startsWith('/api/')

  // Protected routes
  const isAdminRoute = path.startsWith('/admin')
  const isClientRoute = path.startsWith('/client')
  const isProtectedRoute = (isAdminRoute || isClientRoute) && !isPublicRoute

  if (isProtectedRoute) {
    // Check for ANY Supabase auth cookie
    const cookies = request.cookies.getAll()
    const hasAuthCookie = cookies.some(cookie =>
      cookie.name.includes('sb-') && cookie.name.includes('-auth-token')
    )

    if (!hasAuthCookie) {
      // No session, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', path)
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
