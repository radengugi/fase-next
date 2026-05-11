"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ForgotPasswordForm() {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Check your email</h3>
        <p className="text-sm text-neutral-400">
          We've sent you a password reset link. Please check your email inbox.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="text-center mb-4">
        <p className="text-sm text-neutral-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="name@example.com"
        autoComplete="email"
        required
        disabled={isLoading}
      />

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md p-3">
          {error}
        </div>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full mt-2">
        Send Reset Link
      </Button>
    </form>
  )
}
