import { z } from "zod"

export const invoiceStatuses = ["Paid", "Pending", "Overdue", "Cancelled"] as const

export const createInvoiceSchema = z.object({
  client_id: z.string().uuid("Invalid client ID"),
  project_id: z.string().uuid().optional(),
  amount: z.number().positive("Amount must be positive"),
  due_date: z.string().min(1, "Due date is required"),
  notes: z.string().optional()
})

export const updateInvoiceSchema = createInvoiceSchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(invoiceStatuses).optional()
})

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>
