"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Globe, Building2, Edit } from "lucide-react"
import type { Client } from "@/server/repositories/client.repository"

interface ClientDetailProps {
  client: Client
  onEdit: () => void
}

const statusColors: Record<string, "primary" | "success" | "warning" | "danger" | "info"> = {
  lead: "info",
  active: "success",
  completed: "primary",
  on_hold: "warning"
}

export function ClientDetail({ client, onEdit }: ClientDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center text-white font-bold text-xl">
            {client.company_name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{client.company_name}</h2>
            <p className="text-neutral-400">{client.contact_name}</p>
          </div>
        </div>
        <Badge variant={statusColors[client.status]}>{client.status}</Badge>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <Button size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Client
        </Button>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {client.phone && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
              <div className="p-2 rounded-lg bg-neutral-800">
                <Phone className="w-5 h-5 text-neutral-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Phone</p>
                <a
                  href={`tel:${client.phone}`}
                  className="text-sm text-white hover:text-neutral-300 transition-colors"
                >
                  {client.phone}
                </a>
              </div>
            </div>
          )}

          {client.website && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
              <div className="p-2 rounded-lg bg-neutral-800">
                <Globe className="w-5 h-5 text-neutral-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Website</p>
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:text-neutral-300 transition-colors"
                >
                  {client.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Company Information */}
      {client.industry && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Company Information</h3>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <div className="p-2 rounded-lg bg-neutral-800">
              <Building2 className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Industry</p>
              <p className="text-sm text-white">{client.industry}</p>
            </div>
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="pt-4 border-t border-neutral-800">
        <div className="grid grid-cols-2 gap-4 text-xs text-neutral-500">
          <div>
            <p>Created</p>
            <p className="text-neutral-400">{new Date(client.created_at).toLocaleDateString()}</p>
          </div>
          <div>
            <p>Last Updated</p>
            <p className="text-neutral-400">{new Date(client.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
