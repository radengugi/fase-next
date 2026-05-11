"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import type { CreateClientInput, UpdateClientInput } from "@/schemas/client"

export async function getClients() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getClient(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function createClient(input: CreateClientInput) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clients")
    .insert({
      company_name: input.company_name,
      pic_name: input.pic_name,
      email: input.email,
      phone_number: input.phone_number || null,
      industry: input.industry || null,
      company_size: input.company_size || null,
      country: input.country || null,
      website: input.website || null,
      social_media: input.social_media || null,
      notes: input.notes || null,
      status: "Lead"
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/clients")
  return { data }
}

export async function updateClient(input: UpdateClientInput & { id: string }) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("clients")
    .update({
      company_name: input.company_name,
      pic_name: input.pic_name,
      email: input.email,
      phone_number: input.phone_number,
      industry: input.industry,
      company_size: input.company_size,
      country: input.country,
      website: input.website,
      social_media: input.social_media,
      notes: input.notes,
      status: input.status
    })
    .eq("id", input.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/clients")
  return { data }
}

export async function deleteClient(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("clients")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/clients")
  return { success: true }
}
