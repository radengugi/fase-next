import { z } from "zod"

export const clientStatuses = ["lead", "active", "completed", "on_hold"] as const

export const createClientSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  contact_name: z.string().min(2, "Contact name must be at least 2 characters"),
  phone: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  industry: z.string().optional(),
  status: z.enum(clientStatuses).optional()
})

export const updateClientSchema = createClientSchema.partial().extend({
  id: z.string().uuid()
})

export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>
