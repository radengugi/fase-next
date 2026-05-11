import { createClient } from '@/lib/supabase/server'
import type { ProjectStatus, ProjectPriority } from '@/types/database.types'
import { BaseRepository, type ApiResponse, type PaginatedResponse, type QueryParams } from './base.repository'

export type { QueryParams } from './base.repository'

export interface Project {
  id: string
  client_id: string
  name: string
  description: string | null
  status: ProjectStatus
  priority: ProjectPriority
  start_date: string | null
  end_date: string | null
  budget: number | null
  created_at: string
  updated_at: string
  // Joined fields
  clients?: {
    company_name: string
  }
}

export interface CreateProjectInput {
  client_id: string
  name: string
  description?: string | null
  status?: ProjectStatus
  priority?: ProjectPriority
  start_date?: string | null
  end_date?: string | null
  budget?: number | null
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {}

export class ProjectRepository extends BaseRepository {
  async findAll(params: QueryParams = {}): Promise<PaginatedResponse<Project>> {
    try {
      const supabase = await createClient()

      let query = supabase
        .from('projects')
        .select('*, clients(company_name)', { count: 'exact' })

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
      return { data: null, error: error.message || 'Unknown error', pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } }
    }
  }

  async findById(id: string): Promise<ApiResponse<Project>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('projects')
        .select('*, clients(company_name)')
        .eq('id', id)
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse<Project>(null, error)
    }
  }

  async create(input: CreateProjectInput): Promise<ApiResponse<Project>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('projects')
        .insert({
          ...input,
          status: input.status || 'planning',
          priority: input.priority || 'medium'
        })
        .select('*, clients(company_name)')
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse<Project>(null, error)
    }
  }

  async update(id: string, input: UpdateProjectInput): Promise<ApiResponse<Project>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('projects')
        .update(input)
        .eq('id', id)
        .select('*, clients(company_name)')
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse<Project>(null, error)
    }
  }

  async delete(id: string): Promise<ApiResponse<Project>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .select()
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse<Project>(null, error)
    }
  }

  async findByClient(clientId: string, params: QueryParams = {}): Promise<PaginatedResponse<Project>> {
    return this.findAll({
      ...params,
      filters: [...(params.filters || []), { field: 'client_id', operator: 'eq', value: clientId }]
    })
  }

  async getDashboardStats(): Promise<ApiResponse<any>> {
    try {
      const supabase = await createClient()

      const [{ count: total }, { count: inProgress }, { count: completed }] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'in_progress'),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'completed')
      ])

      return {
        data: {
          total: total || 0,
          inProgress: inProgress || 0,
          completed: completed || 0
        },
        error: null
      }
    } catch (error: any) {
      return this.handleResponse(null, error)
    }
  }
}

export const projectRepository = new ProjectRepository()
