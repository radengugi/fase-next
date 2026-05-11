"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Invoice } from "@/server/repositories/invoice.repository"

interface InvoiceFormProps {
  invoice?: Invoice | null
  onSuccess?: () => void
}

export function InvoiceForm({ invoice, onSuccess }: InvoiceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    async function loadClients() {
      const response = await fetch("/api/clients")
      const { data } = await response.json()
      setClients(data || [])
    }
    loadClients()
  }, [])

  async function onSubmit(e: { preventDefault: () => void; currentTarget: HTMLFormElement }) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    if (invoice) {
      // Edit existing invoice
      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(formData.get("amount")),
          due_date: formData.get("due_date") as string,
          notes: formData.get("notes") as string || undefined
        })
      })

      const result = await response.json()

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }
    } else {
      // Create new invoice
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: formData.get("client_id") as string,
          project_id: formData.get("project_id") as string || undefined,
          amount: Number(formData.get("amount")),
          due_date: formData.get("due_date") as string,
          notes: formData.get("notes") as string || undefined
        })
      })

      const result = await response.json()

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }
    }

    setIsLoading(false)
    onSuccess?.()
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!invoice && (
          <Select
            name="client_id"
            label="Client"
            options={clients.map((c) => ({ value: c.id, label: c.company_name }))}
            required
            disabled={isLoading}
          />
        )}

        <Input
          name="amount"
          type="number"
          step="0.01"
          label="Amount"
          placeholder="0.00"
          defaultValue={invoice?.amount ?? undefined}
          required
          disabled={isLoading}
        />

        <Input
          name="due_date"
          type="date"
          label="Due Date"
          defaultValue={invoice?.due_date ?? undefined}
          required
          disabled={isLoading}
        />

        <Input
          name="project_id"
          label="Project (Optional)"
          placeholder="Project ID"
          defaultValue={invoice?.project_id ?? undefined}
          disabled={isLoading}
        />
      </div>

      <Textarea
        name="notes"
        label="Notes"
        placeholder="Additional notes..."
        rows={3}
        defaultValue={invoice?.notes ?? undefined}
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
          {invoice ? "Update Invoice" : "Create Invoice"}
        </Button>
      </div>
    </form>
  )
}
