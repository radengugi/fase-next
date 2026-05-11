import { createClient } from '@/lib/supabase/server'
import type { InvoiceStatus } from '@/types/database.types'
import { BaseRepository, type ApiResponse, type PaginatedResponse, type QueryParams } from './base.repository'

export interface Invoice {
  id: string
  client_id: string
  project_id: string | null
  invoice_number: string
  amount: number
  status: InvoiceStatus
  issue_date: string
  due_date: string
  paid_date: string | null
  notes: string | null
  created_at: string
  updated_at: string
  // Joined fields
  clients?: {
    company_name: string
  }
  projects?: {
    name: string
  }
}

export interface CreateInvoiceInput {
  client_id: string
  project_id?: string | null
  invoice_number: string
  amount: number
  status?: InvoiceStatus
  issue_date: string
  due_date: string
  notes?: string | null
}

export interface UpdateInvoiceInput extends Partial<CreateInvoiceInput> {}

export class InvoiceRepository extends BaseRepository {
  async findAll(params: QueryParams = {}): Promise<PaginatedResponse<Invoice>> {
    try {
      const supabase = await createClient()

      let query = supabase
        .from('invoices')
        .select('*, clients(company_name), projects(name)', { count: 'exact' })

      // Apply filters
      if (params.filters) {
        params.filters.forEach(filter => {
          switch (filter.operator) {
            case 'eq':
              query = query.eq(filter.field, filter.value)
              break
            case 'neq':
              query = query.neq(filter.field, filter.value)
              break
            case 'like':
              query = query.like(filter.field, `%${filter.value}%`)
              break
            case 'ilike':
              query = query.ilike(filter.field, `%${filter.value}%`)
              break
            case 'gt':
              query = query.gt(filter.field, filter.value)
              break
            case 'gte':
              query = query.gte(filter.field, filter.value)
              break
            case 'lt':
              query = query.lt(filter.field, filter.value)
              break
            case 'lte':
              query = query.lte(filter.field, filter.value)
              break
          }
        })
      }

      // Apply sorting
      if (params.sort) {
        query = query.order(params.sort.field, { ascending: params.sort.order === 'asc' })
      }

      // Apply pagination
      const page = params.pagination?.page || 1
      const limit = params.pagination?.limit || 10
      const from = (page - 1) * limit
      const to = from + limit - 1

      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      const totalPages = count ? Math.ceil(count / limit) : 0

      return {
        data: data || [],
        error: null,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages
        }
      }
    } catch (error: any) {
      return this.handleResponse(null, error)
    }
  }

  async findById(id: string): Promise<ApiResponse<Invoice>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('invoices')
        .select('*, clients(company_name), projects(name)')
        .eq('id', id)
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse(null, error)
    }
  }

  async create(input: CreateInvoiceInput): Promise<ApiResponse<Invoice>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('invoices')
        .insert({
          ...input,
          status: input.status || 'draft'
        })
        .select('*, clients(company_name), projects(name)')
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse(null, error)
    }
  }

  async update(id: string, input: UpdateInvoiceInput): Promise<ApiResponse<Invoice>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('invoices')
        .update(input)
        .eq('id', id)
        .select('*, clients(company_name), projects(name)')
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse(null, error)
    }
  }

  async delete(id: string): Promise<ApiResponse<Invoice>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id)
        .select()
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse(null, error)
    }
  }

  async markAsPaid(id: string): Promise<ApiResponse<Invoice>> {
    return this.update(id, {
      status: 'paid',
      paid_date: new Date().toISOString()
    })
  }

  async getByClient(clientId: string, params: QueryParams = {}): Promise<PaginatedResponse<Invoice>> {
    return this.findAll({
      ...params,
      filters: [...(params.filters || []), { field: 'client_id', operator: 'eq', value: clientId }]
    })
  }

  async getOverdue(params: QueryParams = {}): Promise<PaginatedResponse<Invoice>> {
    return this.findAll({
      ...params,
      filters: [
        ...(params.filters || []),
        { field: 'status', operator: 'eq', value: 'overdue' },
        { field: 'due_date', operator: 'lt', value: new Date().toISOString() }
      ]
    })
  }
}

export const invoiceRepository = new InvoiceRepository()
