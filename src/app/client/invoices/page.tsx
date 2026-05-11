"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

export default function ClientInvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvoices()
  }, [])

  async function fetchInvoices() {
    try {
      const response = await fetch("/api/client/invoices")
      const { data } = await response.json()
      setInvoices(data || [])
    } catch (error) {
      console.error("Failed to fetch invoices:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "success"
      case "Pending": return "warning"
      case "Overdue": return "danger"
      case "Cancelled": return "default"
      default: return "default"
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-neutral-400 mt-2">View and manage your invoices.</p>
      </div>

      {invoices.length === 0 ? (
        <Card variant="glass">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-neutral-600" />
            <p className="text-neutral-500">No invoices found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {invoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-neutral-900">
                        <FileText className="w-6 h-6 text-neutral-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{invoice.invoice_number}</h3>
                        {invoice.project && (
                          <p className="text-sm text-neutral-500">{invoice.project.name}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">
                        ${Number(invoice.amount).toLocaleString()}
                      </p>
                      <Badge variant={getStatusColor(invoice.status) as any} className="mt-1">
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Issued: {new Date(invoice.issued_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Due: {new Date(invoice.due_date).toLocaleDateString()}
                      </div>
                    </div>

                    <button className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
