export type ProjectStatus = "Planning" | "Design" | "Development" | "Revision" | "Testing" | "Deployment" | "Maintenance"
export type ProjectPriority = "Low" | "Medium" | "High" | "Urgent"

export interface Project {
  id: string
  name: string
  client_id: string
  service_type: string
  description: string | null
  deadline: string | null
  priority: ProjectPriority
  status: ProjectStatus
  attachments: string[]
  created_at: string
  updated_at: string
  client?: {
    id: string
    company_name: string
  }
  members?: ProjectMember[]
  tasks?: Task[]
}

export interface ProjectMember {
  project_id: string
  user_id: string
  role: string
  joined_at: string
  user?: {
    id: string
    full_name: string
    avatar_url: string | null
  }
}

export interface Task {
  id: string
  project_id: string
  title: string
  description: string | null
  status: string
  assigned_to: string | null
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface CreateProjectInput {
  name: string
  client_id: string
  service_type: string
  description?: string
  deadline?: string
  priority?: ProjectPriority
  status?: ProjectStatus
  assignee_ids?: string[]
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string
}
