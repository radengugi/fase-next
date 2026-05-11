"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { Calendar, Users } from "lucide-react"
import type { Project } from "@/types/project"

interface ProjectTimelineViewProps {
  projects: Project[]
  onUpdate: () => void
}

const statusProgress: Record<string, number> = {
  Planning: 10,
  Design: 25,
  Development: 50,
  Revision: 75,
  Testing: 90,
  Deployment: 100,
  Maintenance: 100
}

export function ProjectTimelineView({ projects }: ProjectTimelineViewProps) {
  const sortedProjects = [...projects].sort((a, b) => {
    if (!a.deadline) return 1
    if (!b.deadline) return -1
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })

  return (
    <div className="space-y-4">
      {sortedProjects.map((project, index) => (
        <div key={project.id} className="relative">
          {/* Timeline line */}
          {index < sortedProjects.length - 1 && (
            <div className="absolute left-4 top-16 bottom-0 w-px bg-neutral-800" />
          )}

          <Card variant="default" className="p-6 ml-12 relative">
            {/* Timeline dot */}
            <div className="absolute -left-12 top-6 w-8 h-8 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white text-lg">{project.name}</h3>
                  <p className="text-neutral-500">{project.client?.company_name}</p>
                </div>
                <Badge variant="primary">{project.status}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Progress</span>
                  <span className="text-white">{statusProgress[project.status]}%</span>
                </div>
                <Progress value={statusProgress[project.status]} />
              </div>

              <div className="flex items-center gap-6 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline"}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {project.members?.length || 0} members
                </div>
              </div>

              {project.members && project.members.length > 0 && (
                <AvatarGroup max={5}>
                  {project.members.map((member) => (
                    <Avatar
                      key={member.user_id}
                      src={member.user?.avatar_url || undefined}
                      fallback={member.user?.full_name || "U"}
                      size="sm"
                    />
                  ))}
                </AvatarGroup>
              )}
            </div>
          </Card>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          No projects to display
        </div>
      )}
    </div>
  )
}
