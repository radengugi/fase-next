export type ClientStatus = "lead" | "active" | "completed" | "on_hold"

export interface Client {
  id: string
  company_name: string
  contact_name: string
  phone: string | null
  website: string | null
  industry: string | null
  status: ClientStatus
  created_at: string
  updated_at: string
}

export interface CreateClientInput {
  company_name: string
  contact_name: string
  phone?: string
  website?: string
  industry?: string
  status?: ClientStatus
}

export interface UpdateClientInput extends Partial<CreateClientInput> {
  id: string
}
