"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import type { CreateTeamMemberInput, UpdateTeamMemberInput } from "@/types/team"

export async function getTeamMembers() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getTeamMember(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function createTeamMember(input: CreateTeamMemberInput) {
  const supabase = await createClient()

  // Generate a random password (user should reset on first login)
  const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

  // Create auth user using signUp (works with anon key)
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: input.email,
    password,
    options: {
      data: {
        full_name: input.full_name,
        role: input.role
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`
    }
  })

  if (authError) {
    return { error: authError.message }
  }

  // Wait a moment for the trigger to create the profile
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Update profile directly to ensure role is set correctly
  if (authData.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ role: input.role })
      .eq("id", authData.user.id)

    if (profileError) {
      console.error("Error updating profile role:", profileError)
    }
  }

  revalidatePath("/admin/team")

  return {
    data: authData.user,
    message: `User created successfully. Temporary password: ${password}. User should reset password on first login.`
  }
}

export async function updateTeamMember(input: UpdateTeamMemberInput) {
  const supabase = await createClient()

  const updateData: Record<string, unknown> = {}
  if (input.full_name !== undefined) updateData.full_name = input.full_name
  if (input.role !== undefined) updateData.role = input.role
  if (input.email !== undefined) updateData.email = input.email

  const { data, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", input.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/team")
  return { data }
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/team")
  return { success: true }
}

export async function inviteTeamMember(email: string, role: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: {
      role
    }
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
