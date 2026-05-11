import { createClient } from '@/lib/supabase/server'
import type { UserRole } from '@/types/database.types'
import { BaseRepository, type ApiResponse, type PaginatedResponse, type QueryParams } from './base.repository'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface UpdateProfileInput {
  full_name?: string
  avatar_url?: string
  role?: UserRole
}

export class ProfileRepository extends BaseRepository {
  async findAll(params: QueryParams = {}): Promise<PaginatedResponse<Profile>> {
    try {
      const supabase = await createClient()

      let query = supabase
        .from('profiles')
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

  async findById(id: string): Promise<ApiResponse<Profile>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse(null, error)
    }
  }

  async update(id: string, input: UpdateProfileInput): Promise<ApiResponse<Profile>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('profiles')
        .update(input)
        .eq('id', id)
        .select()
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse(null, error)
    }
  }

  async delete(id: string): Promise<ApiResponse<Profile>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)
        .select()
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse(null, error)
    }
  }

  async findByRole(role: UserRole, params: QueryParams = {}): Promise<PaginatedResponse<Profile>> {
    return this.findAll({
      ...params,
      filters: [...(params.filters || []), { field: 'role', operator: 'eq', value: role }]
    })
  }

  async search(query: string, params: QueryParams = {}): Promise<PaginatedResponse<Profile>> {
    return this.findAll({
      ...params,
      filters: [
        { field: 'full_name', operator: 'ilike', value: query },
        { field: 'email', operator: 'ilike', value: query }
      ]
    })
  }
}

export const profileRepository = new ProfileRepository()
