"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createProject, updateProject } from "@/services/project"
import { getClients } from "@/services/client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { Project, CreateProjectInput } from "@/types/project"
import type { Client } from "@/types/client"

interface ProjectFormProps {
  project?: Project | null
  onSuccess?: () => void
}

const serviceTypes = ["Web Development", "Mobile App", "UI/UX Design", "Branding", "Digital Marketing", "E-commerce", "Custom"]
const priorities = ["Low", "Medium", "High", "Urgent"]
const statuses = ["Planning", "Design", "Development", "Revision", "Testing", "Deployment", "Maintenance"]

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clients, setClients] = useState<Client[]>([])

  useState(() => {
    async function loadClients() {
      const response = await fetch("/api/clients")
      const { data } = await response.json()
      setClients(data || [])
    }
    loadClients()
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data: CreateProjectInput = {
      name: formData.get("name") as string,
      client_id: formData.get("client_id") as string,
      service_type: formData.get("service_type") as string,
      description: formData.get("description") as string || undefined,
      deadline: formData.get("deadline") as string || undefined,
      priority: (formData.get("priority") as string) || undefined,
      status: (formData.get("status") as string) || undefined,
      assignee_ids: formData.get("assignee_ids") as string as any
    }

    const result = project
      ? await updateProject({ ...data, id: project.id })
      : await createProject(data)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    onSuccess?.()
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="name"
          label="Project Name"
          placeholder="E-commerce Platform"
          required
          defaultValue={project?.name}
          disabled={isLoading}
        />

        <Select
          name="client_id"
          label="Client"
          options={clients.map((c) => ({ value: c.id, label: c.company_name }))}
          required
          defaultValue={project?.client_id || ""}
          disabled={isLoading}
        />

        <Select
          name="service_type"
          label="Service Type"
          options={serviceTypes.map((s) => ({ value: s, label: s }))}
          required
          defaultValue={project?.service_type || ""}
          disabled={isLoading}
        />

        <Select
          name="priority"
          label="Priority"
          options={priorities.map((p) => ({ value: p, label: p }))}
          defaultValue={project?.priority || "Medium"}
          disabled={isLoading}
        />

        <Select
          name="status"
          label="Status"
          options={statuses.map((s) => ({ value: s, label: s }))}
          defaultValue={project?.status || "Planning"}
          disabled={isLoading}
        />

        <Input
          name="deadline"
          type="date"
          label="Deadline"
          defaultValue={project?.deadline?.split("T")[0] || ""}
          disabled={isLoading}
        />
      </div>

      <Textarea
        name="description"
        label="Description"
        placeholder="Project description and requirements..."
        rows={4}
        defaultValue={project?.description || ""}
        disabled={isLoading}
      />

      <MultiSelect
        label="Team Members"
        placeholder="Select team members..."
        options={[]}
        value={[]}
        onChange={() => {}}
      />

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md p-3">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <Button
          type="button"
          variant="ghost"
          onClick={onSuccess}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {project ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  )
}
