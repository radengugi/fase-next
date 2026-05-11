import { createClient } from '@/lib/supabase/server'
import type { ClientStatus } from '@/types/database.types'
import { BaseRepository, type ApiResponse, type PaginatedResponse, type QueryParams } from './base.repository'

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
  phone?: string | null
  website?: string | null
  industry?: string | null
  status?: ClientStatus
}

export interface UpdateClientInput {
  company_name?: string
  contact_name?: string
  phone?: string | null
  website?: string | null
  industry?: string | null
  status?: ClientStatus
}

export class ClientRepository extends BaseRepository {
  async findAll(params: QueryParams = {}): Promise<PaginatedResponse<Client>> {
    try {
      const supabase = await createClient()

      let query = supabase
        .from('clients')
        .select('*', { count: 'exact' })

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
    } catch (error: unknown) {
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0
        }
      }
    }
  }

  async findById(id: string): Promise<ApiResponse<Client>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single()

      return this.handleResponse<Client>(data, error)
    } catch (error: unknown) {
      return this.handleResponse<Client>(null, error as Error)
    }
  }

  async create(input: CreateClientInput): Promise<ApiResponse<Client>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('clients')
        .insert({
          ...input,
          status: input.status || 'lead'
        })
        .select()
        .single()

      return this.handleResponse<Client>(data, error)
    } catch (error: unknown) {
      return this.handleResponse<Client>(null, error as Error)
    }
  }

  async update(id: string, input: UpdateClientInput): Promise<ApiResponse<Client>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('clients')
        .update(input)
        .eq('id', id)
        .select()
        .single()

      return this.handleResponse<Client>(data, error)
    } catch (error: unknown) {
      return this.handleResponse<Client>(null, error as Error)
    }
  }

  async delete(id: string): Promise<ApiResponse<Client>> {
    try {
      const supabase = await createClient()

      const { data, error, count } = await supabase
        .from('clients')
        .delete({ count: 'exact' })
        .eq('id', id)
        .select()

      // Check for actual Supabase errors
      if (error) {
        console.error('[ClientRepository] Supabase error:', error)
        return this.handleResponse<Client>(null, error)
      }

      // Even if count is 0, if there's no error, consider it successful
      // This handles cases where RLS might prevent counting but allow deletion
      return {
        data: data && data.length > 0 ? data[0] : null,
        error: null
      }
    } catch (error: unknown) {
      console.error('[ClientRepository] Exception:', error)
      return this.handleResponse<Client>(null, error as Error)
    }
  }

  async search(query: string, params: QueryParams = {}): Promise<PaginatedResponse<Client>> {
    return this.findAll({
      ...params,
      filters: [
        { field: 'company_name', operator: 'ilike', value: query },
        { field: 'contact_name', operator: 'ilike', value: query }
      ]
    })
  }
}

export const clientRepository = new ClientRepository()
