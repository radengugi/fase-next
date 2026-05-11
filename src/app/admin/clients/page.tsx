'use client'

import { ClientTable } from "@/components/admin/clients/client-table"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-neutral-400">Manage your client relationships and track leads.</p>
      </div>

      <ClientTable />
    </div>
  )
}
