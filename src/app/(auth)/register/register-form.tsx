"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RegisterForm() {
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
    const fullName = formData.get("fullName") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Sign up with Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "client", // Default role
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    // Profile will be created automatically by trigger
    // No need to manually insert

    router.refresh()
    router.push("/")
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        name="fullName"
        type="text"
        label="Full Name"
        placeholder="John Doe"
        autoComplete="name"
        required
        disabled={isLoading}
      />

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
        placeholder="Create a password"
        autoComplete="new-password"
        required
        disabled={isLoading}
      />

      <Input
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        autoComplete="new-password"
        required
        disabled={isLoading}
      />

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md p-3">
          {error}
        </div>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full mt-2">
        Create Account
      </Button>
    </form>
  )
}
