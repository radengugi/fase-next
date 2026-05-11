"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users } from "lucide-react"

export default function ClientProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const response = await fetch("/api/client/projects")
      const { data } = await response.json()
      setProjects(data || [])
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const getProgressValue = (status: string) => {
    switch (status) {
      case "Planning": return 10
      case "Design": return 25
      case "Development": return 50
      case "Revision": return 75
      case "Testing": return 90
      case "Deployment": return 100
      case "Maintenance": return 100
      default: return 0
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning": return "info"
      case "Design": return "primary"
      case "Development": return "warning"
      case "Revision": return "danger"
      case "Testing": return "warning"
      case "Deployment": return "success"
      case "Maintenance": return "primary"
      default: return "default"
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-neutral-400 mt-2">Track the progress of your projects.</p>
      </div>

      {projects.length === 0 ? (
        <Card variant="glass">
          <CardContent className="p-12 text-center">
            <p className="text-neutral-500">No projects found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} variant="glass">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{project.name}</h2>
                    <p className="text-neutral-400 mt-1">{project.service_type}</p>
                  </div>
                  <Badge variant={getStatusColor(project.status) as any}>{project.status}</Badge>
                </div>

                {project.description && (
                  <p className="text-neutral-400 text-sm mb-4">{project.description}</p>
                )}

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-neutral-400">Progress</span>
                      <span className="text-white">{getProgressValue(project.status)}%</span>
                    </div>
                    <Progress value={getProgressValue(project.status)} />
                  </div>

                  <div className="flex items-center gap-6 text-sm text-neutral-500">
                    {project.deadline && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Deadline: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    )}
                    {project.members && project.members.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {project.members.length} team members
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
