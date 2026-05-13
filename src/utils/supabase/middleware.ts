import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { UserRole } from '@/types/auth'

const protectedPaths = ['/admin', '/client']
const authPaths = ['/login', '/register', '/forgot-password']

const roleBasedPaths: Record<string, UserRole[]> = {
  '/admin': ['super_admin', 'admin', 'project_manager', 'developer', 'designer'],
  '/client': ['client', 'super_admin', 'admin']
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Check protected paths
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Check role-based access
  if (user && isProtectedPath) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    const userRole = (profile?.role as UserRole) || user.user_metadata?.role || 'client'

    for (const [path, allowedRoles] of Object.entries(roleBasedPaths)) {
      if (pathname.startsWith(path)) {
        if (!allowedRoles.includes(userRole)) {
          const url = request.nextUrl.clone()
          url.pathname = '/unauthorized'
          return NextResponse.redirect(url)
        }
      }
    }
  }

  // Redirect authenticated users away from auth pages
  if (user && isAuthPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
