"use client"

import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from "@tanstack/react-table"
import { motion } from "framer-motion"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Modal } from "@/components/ui/modal"
import { TeamMemberForm } from "./team-member-form"
import { TeamMemberDetail } from "./team-member-detail"
import type { TeamMember } from "@/types/team"

const roleColors: Record<string, "primary" | "success" | "warning" | "danger" | "info"> = {
  super_admin: "danger",
  admin: "warning",
  client: "info"
}

interface TeamDirectoryProps {
  initialData?: TeamMember[]
}

export function TeamDirectory({ initialData = [] }: TeamDirectoryProps) {
  const [data] = useState<TeamMember[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const columns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: "full_name",
      header: "Team Member",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={row.original.avatar_url || undefined}
            fallback={row.original.full_name || "U"}
            size="sm"
          />
          <div>
            <p className="font-medium text-white">{row.original.full_name}</p>
            <p className="text-sm text-neutral-500">{row.original.email}</p>
          </div>
        </div>
      )
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant={roleColors[row.original.role] || "default"}>
          {row.original.role.replace("_", " ")}
        </Badge>
      )
    },
    {
      accessorKey: "created_at",
      header: "Joined",
      cell: ({ row }) => {
        const date = row.original.created_at
        return date ? new Date(date).toLocaleDateString() : "-"
      }
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedMember(row.original)
              setIsEditing(false)
              setShowModal(true)
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white"
            title="View details"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedMember(row.original)
              setIsEditing(true)
              setShowModal(true)
            }}
            className="text-xs text-[#6366F1] hover:text-[#818CF8] transition-colors"
          >
            Edit
          </button>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      columnFilters,
      globalFilter
    }
  })

  return (
    <>
      <div className="space-y-4">
        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input
              placeholder="Search team members..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button
            size="sm"
            onClick={() => {
              setSelectedMember(null)
              setIsEditing(true)
              setShowModal(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-neutral-800 overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
                    No team members found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for Form/Detail */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedMember(null)
          setIsEditing(false)
        }}
        title={isEditing ? (selectedMember ? "Edit Team Member" : "Add Team Member") : "Team Member Details"}
        size="lg"
      >
        {isEditing ? (
          <TeamMemberForm member={selectedMember} onSuccess={() => setShowModal(false)} />
        ) : (
          selectedMember && <TeamMemberDetail member={selectedMember} onEdit={() => setIsEditing(true)} />
        )}
      </Modal>
    </>
  )
}
