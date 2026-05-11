"use server"

import { createClient as createSupabaseClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import type { CreateClientInput, UpdateClientInput } from "@/schemas/client"

export async function getClients() {
  const supabase = await createSupabaseClient()

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
  const supabase = await createSupabaseClient()

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

export async function createClientRecord(input: CreateClientInput) {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from("clients")
    .insert({
      company_name: input.company_name,
      contact_name: input.contact_name,
      phone: input.phone || null,
      industry: input.industry || null,
      website: input.website || null,
      status: input.status || "lead"
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/clients")
  return { data }
}

export async function updateClientRecord(input: UpdateClientInput & { id: string }) {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from("clients")
    .update({
      company_name: input.company_name,
      contact_name: input.contact_name,
      phone: input.phone,
      industry: input.industry,
      website: input.website,
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
  const supabase = await createSupabaseClient()

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
