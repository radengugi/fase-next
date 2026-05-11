"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, Building2, Mail } from "lucide-react"
import type { Invoice } from "@/server/repositories/invoice.repository"

interface InvoiceDetailProps {
  invoice?: Invoice | null
  onEdit?: () => void
  onClose?: () => void
}

const statusColors: Record<string, "success" | "warning" | "danger" | "info"> = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
  draft: "info",
  cancelled: "info"
}

export function InvoiceDetail({ invoice, onEdit, onClose }: InvoiceDetailProps) {
  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-500">No invoice selected</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-neutral-800">
              <FileText className="w-5 h-5 text-neutral-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">{invoice.invoice_number}</h2>
          </div>
          <p className="text-neutral-500">{invoice.projects?.name || "General Invoice"}</p>
        </div>
        <Badge variant={statusColors[invoice.status]}>{invoice.status}</Badge>
      </div>

      {/* Amount */}
      <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800">
        <p className="text-sm text-neutral-400 mb-1">Total Amount</p>
        <p className="text-4xl font-bold text-white">
          ${Number(invoice.amount).toLocaleString()}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Invoice Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <div className="p-2 rounded-lg bg-neutral-800">
              <Building2 className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Client</p>
              <p className="text-sm text-white">{invoice.clients?.company_name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <div className="p-2 rounded-lg bg-neutral-800">
              <Calendar className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Due Date</p>
              <p className="text-sm text-white">{new Date(invoice.due_date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <div className="p-2 rounded-lg bg-neutral-800">
              <Calendar className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Issued Date</p>
              <p className="text-sm text-white">{new Date(invoice.issue_date).toLocaleDateString()}</p>
            </div>
          </div>

          {invoice.paid_date && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
              <div className="p-2 rounded-lg bg-neutral-800">
                <Calendar className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Paid Date</p>
                <p className="text-sm text-white">{new Date(invoice.paid_date).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Notes</h3>
          <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <p className="text-sm text-neutral-300">{invoice.notes}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <Button variant="secondary" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button size="sm">
          <Mail className="w-4 h-4 mr-2" />
          Send to Client
        </Button>
      </div>
    </div>
  )
}
