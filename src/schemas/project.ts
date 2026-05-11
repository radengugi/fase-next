import { z } from "zod"

export const projectStatuses = ["Planning", "Design", "Development", "Revision", "Testing", "Deployment", "Maintenance"] as const
export const projectPriorities = ["Low", "Medium", "High", "Urgent"] as const
export const serviceTypes = ["Web Development", "Mobile App", "UI/UX Design", "Branding", "Digital Marketing", "E-commerce", "Custom"] as const

export const createProjectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  client_id: z.string().uuid("Invalid client ID"),
  service_type: z.enum(serviceTypes),
  description: z.string().optional(),
  deadline: z.string().optional(),
  priority: z.enum(projectPriorities).optional(),
  status: z.enum(projectStatuses).optional(),
  assignee_ids: z.array(z.string().uuid()).optional()
})

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string().uuid()
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
