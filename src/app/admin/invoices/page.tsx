"use client"

import { useState, useMemo } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { motion } from "framer-motion"
import { Search, Plus, Download, MoreHorizontal, FileText, DollarSign, TrendingUp, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Modal } from "@/components/ui/modal"
import { InvoiceForm } from "@/components/admin/invoices/invoice-form"
import { InvoiceDetail } from "@/components/admin/invoices/invoice-detail"
import { useInvoices, useDeleteInvoice, useMarkAsPaid } from "@/hooks/api/useInvoices"
import { useToast } from "@/components/ui/toast"
import type { Invoice } from "@/server/repositories/invoice.repository"

const statusColors: Record<string, "success" | "warning" | "danger" | "info"> = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
  draft: "info",
  cancelled: "info"
}

export default function InvoicesPage() {
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const { showToast } = useToast()
  const { invoices, loading, error, refetch } = useInvoices()
  const { deleteInvoice, loading: deleting } = useDeleteInvoice()
  const { markAsPaid, loading: markingPaid } = useMarkAsPaid()

  const stats = useMemo(() => {
    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0)
    const pendingAmount = invoices
      .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
      .reduce((sum, inv) => sum + (inv.amount || 0), 0)
    const paidCount = invoices.filter(inv => inv.status === 'paid').length
    const pendingCount = invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue').length

    return { totalRevenue, pendingAmount, paidCount, pendingCount }
  }, [invoices])

  const filteredInvoices = useMemo(() => {
    if (!search) return invoices
    const lowerSearch = search.toLowerCase()
    return invoices.filter(inv =>
      inv.invoice_number.toLowerCase().includes(lowerSearch) ||
      (inv.clients?.company_name && inv.clients.company_name.toLowerCase().includes(lowerSearch))
    )
  }, [invoices, search])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return

    const result = await deleteInvoice(id)
    if (result.success) {
      showToast({ type: 'success', title: 'Success', message: 'Invoice deleted successfully' })
      refetch()
    } else {
      showToast({ type: 'error', title: 'Error', message: result.error || 'Failed to delete invoice' })
    }
  }

  const handleMarkAsPaid = async (id: string) => {
    const result = await markAsPaid(id)
    if (result.success) {
      showToast({ type: 'success', title: 'Success', message: 'Invoice marked as paid' })
      refetch()
    } else {
      showToast({ type: 'error', title: 'Error', message: result.error || 'Failed to mark as paid' })
    }
  }

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "invoice_number",
      header: "Invoice",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neutral-800">
            <FileText className="w-4 h-4 text-neutral-400" />
          </div>
          <div>
            <p className="font-medium text-white">{row.original.invoice_number}</p>
            <p className="text-sm text-neutral-500">{row.original.projects?.name || "General"}</p>
          </div>
        </div>
      )
    },
    {
      accessorKey: "clients",
      header: "Client",
      cell: ({ row }) => row.original.clients?.company_name || "-"
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-medium text-white">
          ${Number(row.original.amount).toLocaleString()}
        </span>
      )
    },
    {
      accessorKey: "issue_date",
      header: "Issue Date",
      cell: ({ row }) => new Date(row.original.issue_date).toLocaleDateString()
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => new Date(row.original.due_date).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={statusColors[row.original.status] || "default"}>
          {row.original.status}
        </Badge>
      )
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedInvoice(row.original)
                setIsEditing(false)
                setShowModal(true)
              }}
            >
              View Details
            </DropdownMenuItem>
            {row.original.status !== 'paid' && (
              <DropdownMenuItem
                onClick={() => handleMarkAsPaid(row.original.id)}
                disabled={markingPaid}
              >
                Mark as Paid
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                setSelectedInvoice(row.original)
                setIsEditing(true)
                setShowModal(true)
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original.id)}
              className="text-red-500"
              disabled={deleting}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  const table = useReactTable({
    data: filteredInvoices,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-neutral-400">Manage invoices and track payments.</p>
        </div>
        <Button onClick={() => { setSelectedInvoice(null); setIsEditing(true); setShowModal(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-neutral-900">
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm text-neutral-400 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-neutral-900">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                </div>
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-sm text-neutral-400 mb-1">Pending Amount</p>
              <p className="text-2xl font-bold text-white">${stats.pendingAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="glass">
            <CardContent className="p-6">
              <div className="p-2 rounded-lg bg-neutral-900 mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm text-neutral-400 mb-1">Paid Invoices</p>
              <p className="text-2xl font-bold text-white">{stats.paidCount}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass">
            <CardContent className="p-6">
              <div className="p-2 rounded-lg bg-neutral-900 mb-4">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-sm text-neutral-400 mb-1">Pending Invoices</p>
              <p className="text-2xl font-bold text-white">{stats.pendingCount}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <Input
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="secondary">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-[#B9fA3C] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="rounded-lg border border-neutral-800 overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No invoices found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedInvoice(null)
          setIsEditing(false)
        }}
        title={isEditing ? (selectedInvoice ? 'Edit Invoice' : 'Create Invoice') : 'Invoice Details'}
        size="lg"
      >
        {isEditing ? (
          <InvoiceForm
            invoice={selectedInvoice}
            onSuccess={() => {
              setShowModal(false)
              refetch()
            }}
          />
        ) : (
          <InvoiceDetail
            invoice={selectedInvoice}
            onEdit={() => setIsEditing(true)}
            onClose={() => setShowModal(false)}
          />
        )}
      </Modal>
    </div>
  )
}
