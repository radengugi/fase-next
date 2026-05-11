"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import type { CreateInvoiceInput, UpdateInvoiceInput } from "@/schemas/invoice"

export async function getInvoices() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      client:clients(id, company_name, email),
      project:projects(id, name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getInvoice(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      client:clients(*),
      project:projects(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function createInvoice(input: CreateInvoiceInput) {
  const supabase = await createClient()

  // Generate invoice number
  const { count } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true })

  const invoiceNumber = `INV-${String((count || 0) + 1).padStart(4, "0")}`

  const { data, error } = await supabase
    .from("invoices")
    .insert({
      client_id: input.client_id,
      project_id: input.project_id || null,
      invoice_number: invoiceNumber,
      amount: input.amount,
      status: "Pending",
      due_date: input.due_date,
      notes: input.notes || null
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/invoices")
  return { data }
}

export async function updateInvoice(input: UpdateInvoiceInput & { id: string }) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .update({
      client_id: input.client_id,
      project_id: input.project_id,
      amount: input.amount,
      status: input.status,
      due_date: input.due_date,
      notes: input.notes
    })
    .eq("id", input.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/invoices")
  return { data }
}

export async function deleteInvoice(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/invoices")
  return { success: true }
}

export async function updateInvoiceStatus(id: string, status: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("invoices")
    .update({ status })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/invoices")
  return { data }
}

export async function getInvoiceStats() {
  const supabase = await createClient()

  const { data: invoices } = await supabase
    .from("invoices")
    .select("amount, status, created_at")

  if (!invoices) {
    return { error: "Failed to fetch invoices" }
  }

  const totalRevenue = invoices
    .filter(i => i.status === "Paid")
    .reduce((sum, i) => sum + Number(i.amount), 0)

  const pendingAmount = invoices
    .filter(i => i.status === "Pending" || i.status === "Overdue")
    .reduce((sum, i) => sum + Number(i.amount), 0)

  const paidCount = invoices.filter(i => i.status === "Paid").length
  const pendingCount = invoices.filter(i => i.status === "Pending" || i.status === "Overdue").length

  return {
    data: {
      totalRevenue,
      pendingAmount,
      paidCount,
      pendingCount,
      totalInvoices: invoices.length
    }
  }
}
