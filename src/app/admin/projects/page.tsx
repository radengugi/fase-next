"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProjectTableView } from "@/components/admin/projects/project-table-view"
import { ProjectKanbanView } from "@/components/admin/projects/project-kanban-view"
import { ProjectTimelineView } from "@/components/admin/projects/project-timeline-view"
import { useProjects } from "@/hooks/api/useProjects"

export default function ProjectsPage() {
  const [view, setView] = useState<"table" | "kanban" | "timeline">("table")

  const { projects, loading, error, refetch } = useProjects({
    sort: { field: 'created_at', order: 'desc' }
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-neutral-400">Manage your projects and track progress.</p>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as any)}>
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Views */}
      <Tabs value={view}>
        <TabsContent value="table" className="mt-0">
          <ProjectTableView projects={projects} onUpdate={refetch} />
        </TabsContent>
        <TabsContent value="kanban" className="mt-0">
          <ProjectKanbanView projects={projects} onUpdate={refetch} />
        </TabsContent>
        <TabsContent value="timeline" className="mt-0">
          <ProjectTimelineView projects={projects} onUpdate={refetch} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
