"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toast"
import { useCreateClient, useUpdateClient } from "@/hooks/api/useClients"
import type { Client, CreateClientInput, UpdateClientInput } from "@/server/repositories/client.repository"
import type { ClientStatus } from "@/types/database.types"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

interface ClientFormProps {
  client?: Client | null
  onSuccess?: () => void
}

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Entertainment",
  "Consulting",
  "Other"
]

export function ClientForm({ client, onSuccess }: ClientFormProps) {
  const [formData, setFormData] = useState<CreateClientInput>({
    company_name: client?.company_name || "",
    contact_name: client?.contact_name || "",
    phone: client?.phone || "",
    website: client?.website || "",
    industry: client?.industry || "",
    status: client?.status || "lead"
  })

  const [error, setError] = useState<string | null>(null)

  // Update form data when client prop changes
  useEffect(() => {
    setFormData({
      company_name: client?.company_name || "",
      contact_name: client?.contact_name || "",
      phone: client?.phone || "",
      website: client?.website || "",
      industry: client?.industry || "",
      status: client?.status || "lead"
    })
    setError(null)
  }, [client])

  const { createClient, loading: creating } = useCreateClient()
  const { updateClient, loading: updating } = useUpdateClient()
  const { showToast } = useToast()

  const loading = creating || updating

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const result = client?.id
      ? await updateClient(client.id, formData as UpdateClientInput)
      : await createClient(formData)

    if (result.success) {
      showToast({
        type: 'success',
        title: client?.id ? 'Client Updated' : 'Client Created',
        message: `Client ${client?.id ? 'updated' : 'created'} successfully`
      })
      onSuccess?.()
    } else {
      setError(result.error || 'Failed to save client')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Input
          name="company_name"
          label="Company Name"
          placeholder="Acme Corporation"
          required
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          disabled={loading}
        />

        <Input
          name="contact_name"
          label="Contact Name"
          placeholder="John Smith"
          required
          value={formData.contact_name}
          onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
          disabled={loading}
        />

        <Input
          name="phone"
          type="tel"
          label="Phone Number"
          placeholder="+8123456789"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value || undefined })}
          disabled={loading}
        />

        <Input
          name="website"
          label="Website"
          placeholder="https://acme.com"
          value={formData.website || ""}
          onChange={(e) => setFormData({ ...formData, website: e.target.value || undefined })}
          disabled={loading}
        />

        <Select
          name="industry"
          label="Industry"
          value={formData.industry || ""}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value || undefined })}
          disabled={loading}
          options={[
            { value: "", label: "Select industry" },
            ...industries.map(ind => ({ value: ind, label: ind }))
          ]}
        />

        {client && (
          <Select
            name="status"
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ClientStatus })}
            disabled={loading}
            options={[
              { value: "lead", label: "Lead" },
              { value: "active", label: "Active" },
              { value: "completed", label: "Completed" },
              { value: "on_hold", label: "On Hold" }
            ]}
          />
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onSuccess?.()}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            client ? 'Update Client' : 'Create Client'
          )}
        </Button>
      </div>
    </form>
  )
}
