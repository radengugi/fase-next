import { z } from "zod"

export const userRoles = ["super_admin", "admin", "client"] as const

export const createTeamMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(userRoles)
})

export const updateTeamMemberSchema = createTeamMemberSchema.partial().extend({
  id: z.string().uuid()
})

export type CreateTeamMemberInput = z.infer<typeof createTeamMemberSchema>
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>
