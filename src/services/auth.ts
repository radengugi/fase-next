"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { LoginInput, RegisterInput, ForgotPasswordInput } from "@/schemas/auth"

export async function login(data: LoginInput) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function register(data: RegisterInput) {
  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
        role: data.role || "client"
      }
    }
  })

  if (authError) {
    return { error: authError.message }
  }

  if (authData.user) {
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: data.email,
      full_name: data.fullName,
      role: (data.role || "client") as any
    })

    if (profileError) {
      return { error: profileError.message }
    }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function forgotPassword(data: ForgotPasswordInput) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/login")
}

export async function getCurrentUser() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single()

  return profile
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

export async function requireRole(role: string) {
  const user = await requireAuth()

  if (user.role !== role) {
    redirect("/")
  }

  return user
}
