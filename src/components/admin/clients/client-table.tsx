"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Drawer } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useToast } from "@/components/ui/toast"
import { useClients, useDeleteClient } from "@/hooks/api/useClients"
import type { Client } from "@/server/repositories/client.repository"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown, Filter, MoreVertical, Plus, Search, Eye, Pencil, Trash2, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { ClientDetail } from "./client-detail"
import { ClientForm } from "./client-form"

const statusColors: Record<string, "success" | "warning" | "danger" | "info"> = {
  lead: "info",
  active: "success",
  completed: "warning",
  on_hold: "danger"
}

export function ClientTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [showDrawer, setShowDrawer] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 10 })

  const { showToast } = useToast()
  const { clients, loading, error, pagination: apiPagination, refetch } = useClients({
    pagination,
    sort: sorting[0] ? { field: sorting[0].id, order: sorting[0].desc ? 'desc' : 'asc' } : undefined,
    filters: columnFilters.map(f => ({ field: f.id, operator: 'eq', value: f.value as string }))
  })

  const { deleteClient } = useDeleteClient()

  // Update pagination when API pagination changes
  useEffect(() => {
    if (apiPagination) {
      setPagination({ page: apiPagination.page, limit: apiPagination.limit })
    }
  }, [apiPagination])

  const handleDelete = useCallback(async (id: string) => {
    const result = await deleteClient(id)
    if (result.success) {
      showToast({ type: 'success', title: 'Success', message: 'Client deleted successfully' })
      setDeleteModalOpen(false)
      setClientToDelete(null)
      setActiveDropdown(null)
      // Optimistically update the UI immediately
      refetch({
        pagination,
        sort: sorting[0] ? { field: sorting[0].id, order: sorting[0].desc ? 'desc' : 'asc' } : undefined,
        filters: columnFilters.map(f => ({ field: f.id, operator: 'eq', value: f.value as string }))
      })
    } else {
      showToast({ type: 'error', title: 'Error', message: result.error || 'Failed to delete client' })
    }
  }, [deleteClient, showToast, refetch, pagination, sorting, columnFilters])

  const openDeleteModal = useCallback((client: Client) => {
    setClientToDelete(client)
    setDeleteModalOpen(true)
    setActiveDropdown(null)
  }, [])

  const columns: ColumnDef<Client>[] = useMemo(() => [
    {
      accessorKey: "company_name",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:text-white"
        >
          Company
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center text-white font-medium text-sm">
            {row.original.company_name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-white">{row.original.company_name}</p>
            <p className="text-sm text-neutral-500">{row.original.contact_name}</p>
          </div>
        </div>
      )
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.original.phone || "-"
    },
    {
      accessorKey: "website",
      header: "Website",
      cell: ({ row }) => row.original.website ? (
        <a
          href={row.original.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#B9fA3C] hover:underline"
        >
          {row.original.website}
        </a>
      ) : "-"
    },
    {
      accessorKey: "industry",
      header: "Industry",
      cell: ({ row }) => row.original.industry || "-"
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
      cell: ({ row }) => {
        const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
          const rect = e.currentTarget.getBoundingClientRect()
          setDropdownPosition({
            top: rect.bottom + 4,
            left: rect.right - 176
          })
          setActiveDropdown(row.id)
        }

        return (
          <>
            <div className="relative group">
              <button
                onMouseEnter={handleMouseEnter}
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group-hover:bg-white/10"
              >
                <MoreVertical className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            {activeDropdown === row.id && createPortal(
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'fixed',
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  zIndex: 9999
                }}
                className="w-44 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700/50 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                onMouseEnter={() => setActiveDropdown(row.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="p-1.5">
                  <button
                    onClick={() => {
                      setSelectedClient(row.original)
                      setIsEditing(false)
                      setShowDrawer(true)
                    }}
                    className="w-full px-3 py-2.5 text-left text-sm text-neutral-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-150 flex items-center gap-3 group/item"
                  >
                    <div className="p-1.5 rounded-md bg-neutral-800 group-hover/item:bg-neutral-700 transition-colors">
                      <Eye className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-white transition-colors" />
                    </div>
                    <span className="font-medium">View Details</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClient(row.original)
                      setIsEditing(true)
                      setShowDrawer(true)
                    }}
                    className="w-full px-3 py-2.5 text-left text-sm text-neutral-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-150 flex items-center gap-3 group/item"
                  >
                    <div className="p-1.5 rounded-md bg-neutral-800 group-hover/item:bg-neutral-700 transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-white transition-colors" />
                    </div>
                    <span className="font-medium">Edit Client</span>
                  </button>
                  <div className="my-1.5 h-px bg-neutral-800/50" />
                  <button
                    onClick={() => openDeleteModal(row.original)}
                    className="w-full px-3 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all duration-150 flex items-center gap-3 group/item"
                  >
                    <div className="p-1.5 rounded-md bg-red-500/10 group-hover/item:bg-red-500/20 transition-colors">
                      <Trash2 className="w-3.5 h-3.5 transition-colors" />
                    </div>
                    <span className="font-medium">Delete Client</span>
                  </button>
                </div>
              </motion.div>,
              document.body
            )}
          </>
        )
      }
    }
  ], [activeDropdown, setActiveDropdown, dropdownPosition.top, dropdownPosition.left, openDeleteModal])

  const table = useReactTable({
    data: clients,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter
    },
    pageCount: apiPagination?.totalPages || 1
  })

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  return (
    <>
      <div className="space-y-4">
        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input
              placeholder="Search clients..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setSelectedClient(null)
                setIsEditing(true)
                setShowDrawer(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
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
                      No clients found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && clients.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-500">
              Showing {table.getFilteredRowModel().rows.length} of {apiPagination?.total || 0} clients
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-neutral-400">
                Page {pagination.page} of {apiPagination?.totalPages || 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= (apiPagination?.totalPages || 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Drawer */}
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false)
          setSelectedClient(null)
          setIsEditing(false)
        }}
      >
        {isEditing ? (
          <ClientForm
            client={selectedClient}
            onSuccess={() => {
              setShowDrawer(false)
              refetch({
                pagination,
                sort: sorting[0] ? { field: sorting[0].id, order: sorting[0].desc ? 'desc' : 'asc' } : undefined,
                filters: columnFilters.map(f => ({ field: f.id, operator: 'eq', value: f.value as string }))
              })
            }}
          />
        ) : selectedClient ? (
          <ClientDetail
            client={selectedClient}
            onEdit={() => setIsEditing(true)}
          />
        ) : null}
      </Drawer>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setClientToDelete(null)
        }}
        title="Delete Client"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Are you sure you want to delete this client?</p>
              <p className="text-neutral-400 text-sm">This action cannot be undone.</p>
            </div>
          </div>

          {clientToDelete && (
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Client to delete</p>
              <p className="text-white font-medium text-lg">{clientToDelete.company_name}</p>
              <p className="text-sm text-neutral-400">{clientToDelete.contact_name}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setDeleteModalOpen(false)
                setClientToDelete(null)
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => clientToDelete && handleDelete(clientToDelete.id)}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Delete Client
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
