"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Dropdown } from "@/components/ui/dropdown"
import { Drawer } from "@/components/ui/drawer"
import { ProjectForm } from "./project-form"
import { Calendar, Users, MoreHorizontal, Plus } from "lucide-react"
import { useState } from "react"
import type { Project } from "@/types/project"

const statusColors: Record<string, "primary" | "success" | "warning" | "danger" | "info"> = {
  Planning: "info",
  Design: "primary",
  Development: "warning",
  Revision: "danger",
  Testing: "warning",
  Deployment: "success",
  Maintenance: "primary"
}

const priorityColors: Record<string, "primary" | "success" | "warning" | "danger"> = {
  Low: "primary",
  Medium: "info",
  High: "warning",
  Urgent: "danger"
}

interface ProjectTableViewProps {
  projects: Project[]
  onUpdate: () => void
}

export function ProjectTableView({ projects, onUpdate }: ProjectTableViewProps) {
  const [showDrawer, setShowDrawer] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "name",
      header: "Project",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-white">{row.original.name}</p>
          <p className="text-sm text-neutral-500">{row.original.client?.company_name}</p>
        </div>
      )
    },
    {
      accessorKey: "service_type",
      header: "Service"
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
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <Badge variant={priorityColors[row.original.priority] || "default"}>
          {row.original.priority}
        </Badge>
      )
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => (
        row.original.deadline ? (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-neutral-500" />
            {new Date(row.original.deadline).toLocaleDateString()}
          </div>
        ) : "-"
      )
    },
    {
      accessorKey: "members",
      header: "Team",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-neutral-500" />
          <span className="text-sm">{row.original.members?.length || 0}</span>
        </div>
      )
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Dropdown>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          <DropdownContent align="end">
            <DropdownItem
              value="view"
              onClick={() => {
                setSelectedProject(row.original)
                setShowDrawer(true)
              }}
            >
              View Details
            </DropdownItem>
            <DropdownItem value="edit">Edit</DropdownItem>
          </DropdownContent>
        </Dropdown>
      )
    }
  ]

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={() => {
              setSelectedProject(null)
              setShowDrawer(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

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
              {table.getRowModel().rows?.length ? (
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
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false)
          setSelectedProject(null)
        }}
        title={selectedProject ? "Edit Project" : "New Project"}
        size="lg"
      >
        <ProjectForm project={selectedProject} onSuccess={() => {
          setShowDrawer(false)
          onUpdate()
        }} />
      </Drawer>
    </>
  )
}
