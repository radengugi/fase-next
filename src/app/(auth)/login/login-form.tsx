"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LoginForm() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { error: authError, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    // Add small delay to ensure session is established
    await new Promise(resolve => setTimeout(resolve, 500))

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profileError) {
      router.push('/admin/dashboard')
      setIsLoading(false)
      return
    }

    const userRole = profile?.role

    // Refresh and redirect based on role
    router.refresh()

    if (userRole === 'super_admin' || userRole === 'admin' || userRole === 'project_manager' || userRole === 'designer' || userRole === 'developer') {
      router.push('/admin/dashboard')
    } else {
      // For client or unknown role
      router.push('/')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="name@example.com"
        autoComplete="email"
        required
        disabled={isLoading}
      />

      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        required
        disabled={isLoading}
      />

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md p-3">
          {error}
        </div>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full mt-2">
        Sign In
      </Button>
    </form>
  )
}
