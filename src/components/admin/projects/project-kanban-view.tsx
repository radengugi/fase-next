"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { Plus, Calendar, Users } from "lucide-react"
import { Drawer } from "@/components/ui/drawer"
import { ProjectForm } from "./project-form"
import type { Project } from "@/types/project"

const columns = [
  { id: "planning", title: "Planning", status: "Planning" },
  { id: "design", title: "Design", status: "Design" },
  { id: "development", title: "Development", status: "Development" },
  { id: "revision", title: "Revision", status: "Revision" },
  { id: "testing", title: "Testing", status: "Testing" },
  { id: "deployment", title: "Deployment", status: "Deployment" }
]

const priorityColors: Record<string, string> = {
  Low: "border-neutral-700",
  Medium: "border-blue-500/30",
  High: "border-amber-500/30",
  Urgent: "border-red-500/30"
}

interface ProjectKanbanViewProps {
  projects: Project[]
  onUpdate: () => void
}

export function ProjectKanbanView({ projects, onUpdate }: ProjectKanbanViewProps) {
  const [showDrawer, setShowDrawer] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const getProjectsByStatus = (status: string) => {
    return projects.filter(p => p.status === status)
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnProjects = getProjectsByStatus(column.status)

          return (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{column.title}</h3>
                <span className="text-sm text-neutral-500">{columnProjects.length}</span>
              </div>

              <div className="space-y-3">
                {columnProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layoutId={project.id}
                    whileHover={{ y: -2 }}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project)
                      setShowDrawer(true)
                    }}
                  >
                    <Card
                      variant="default"
                      className={`p-4 border-l-4 ${priorityColors[project.priority]} hover:border-neutral-700 transition-colors`}
                    >
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-white mb-1">{project.name}</p>
                          <p className="text-sm text-neutral-500">{project.client?.company_name}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="primary" size="sm">{project.service_type}</Badge>
                          <Badge variant={project.priority === "Urgent" ? "danger" : project.priority === "High" ? "warning" : "default"} size="sm">
                            {project.priority}
                          </Badge>
                        </div>

                        {project.deadline && (
                          <div className="flex items-center gap-2 text-xs text-neutral-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        )}

                        {project.members && project.members.length > 0 && (
                          <div className="flex items-center justify-between">
                            <AvatarGroup max={3}>
                              {project.members.map((member) => (
                                <Avatar
                                  key={member.user_id}
                                  src={member.user?.avatar_url || undefined}
                                  fallback={member.user?.full_name || "U"}
                                  size="sm"
                                />
                              ))}
                            </AvatarGroup>
                            <span className="text-xs text-neutral-500">{project.members.length} members</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {columnProjects.length === 0 && (
                  <div className="text-center py-8 text-neutral-600 text-sm">
                    No projects
                  </div>
                )}
              </div>
            </div>
          )
        })}
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
