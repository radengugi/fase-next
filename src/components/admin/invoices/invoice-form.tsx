"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createInvoice } from "@/services/invoice"
import { getClients } from "@/services/client"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { CreateInvoiceInput } from "@/types/invoice"

interface InvoiceFormProps {
  onSuccess?: () => void
}

export function InvoiceForm({ onSuccess }: InvoiceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clients, setClients] = useState<any[]>([])

  useState(() => {
    async function loadClients() {
      const response = await fetch("/api/clients")
      const { data } = await response.json()
      setClients(data || [])
    }
    loadClients()
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data: CreateInvoiceInput = {
      client_id: formData.get("client_id") as string,
      project_id: formData.get("project_id") as string || undefined,
      amount: Number(formData.get("amount")),
      due_date: formData.get("due_date") as string,
      notes: formData.get("notes") as string || undefined
    }

    const result = await createInvoice(data)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    onSuccess?.()
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          name="client_id"
          label="Client"
          options={clients.map((c) => ({ value: c.id, label: c.company_name }))}
          required
          disabled={isLoading}
        />

        <Input
          name="amount"
          type="number"
          step="0.01"
          label="Amount"
          placeholder="0.00"
          required
          disabled={isLoading}
        />

        <Input
          name="due_date"
          type="date"
          label="Due Date"
          required
          disabled={isLoading}
        />

        <Input
          name="project_id"
          label="Project (Optional)"
          placeholder="Project ID"
          disabled={isLoading}
        />
      </div>

      <Textarea
        name="notes"
        label="Notes"
        placeholder="Additional notes..."
        rows={3}
        disabled={isLoading}
      />

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md p-3">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <Button
          type="button"
          variant="ghost"
          onClick={onSuccess}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Create Invoice
        </Button>
      </div>
    </form>
  )
}
