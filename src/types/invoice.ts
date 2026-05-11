export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Cancelled"

export interface Invoice {
  id: string
  client_id: string
  project_id: string | null
  invoice_number: string
  amount: number
  status: InvoiceStatus
  due_date: string
  issued_date: string
  pdf_url: string | null
  notes: string | null
  created_at: string
  updated_at: string
  client?: {
    id: string
    company_name: string
    email: string
  }
  project?: {
    id: string
    name: string
  }
}

export interface CreateInvoiceInput {
  client_id: string
  project_id?: string
  amount: number
  due_date: string
  notes?: string
}

export interface UpdateInvoiceInput extends Partial<CreateInvoiceInput> {
  id: string
  status?: InvoiceStatus
}
