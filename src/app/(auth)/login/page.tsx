import { LoginForm } from "./login-form"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export default async function LoginPage() {
  const supabase = await createClient()

  // Check if user is already logged in
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    // User is logged in, get their profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const userRole = profile?.role

    // Redirect based on role
    if (userRole === 'super_admin' || userRole === 'admin' || userRole === 'project_manager' || userRole === 'designer' || userRole === 'developer') {
      redirect('/admin/dashboard')
    } else {
      redirect('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold tracking-tight text-white">FASE</h1>
          </Link>
          <p className="mt-2 text-sm text-neutral-400">Sign in to your account</p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <LoginForm />

          <div className="mt-6 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-center text-sm text-neutral-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-white hover:text-neutral-200 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
