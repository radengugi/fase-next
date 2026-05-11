import { createClient } from '@/lib/supabase/server'
import { BaseRepository, type ApiResponse, type PaginatedResponse, type QueryParams } from './base.repository'

export type { QueryParams } from './base.repository'

export interface FileItem {
  id: string
  project_id: string | null
  client_id: string | null
  name: string
  file_path: string
  file_size: number
  mime_type: string
  uploaded_by: string | null
  created_at: string
  // Joined fields
  projects?: {
    name: string
  }
  clients?: {
    company_name: string
  }
  uploaders?: {
    full_name: string
    email: string
  }
}

export interface CreateFileInput {
  project_id?: string | null
  client_id?: string | null
  name: string
  file_path: string
  file_size: number
  mime_type: string
}

export class FileRepository extends BaseRepository {
  async findAll(params: QueryParams = {}): Promise<PaginatedResponse<FileItem>> {
    try {
      const supabase = await createClient()

      let query = supabase
        .from('files')
        .select('*, projects(name), clients(company_name)', { count: 'exact' })

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
      return { data: null, error: error.message || 'Unknown error', pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } }
    }
  }

  async findById(id: string): Promise<ApiResponse<FileItem>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('files')
        .select('*, projects(name), clients(company_name)')
        .eq('id', id)
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse<FileItem>(null, error)
    }
  }

  async create(input: CreateFileInput): Promise<ApiResponse<FileItem>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('files')
        .insert(input)
        .select('*, projects(name), clients(company_name)')
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse<FileItem>(null, error)
    }
  }

  async delete(id: string): Promise<ApiResponse<FileItem>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('files')
        .delete()
        .eq('id', id)
        .select()
        .single()

      return this.handleResponse(data, error)
    } catch (error: any) {
      return this.handleResponse<FileItem>(null, error)
    }
  }

  async getByProject(projectId: string, params: QueryParams = {}): Promise<PaginatedResponse<FileItem>> {
    return this.findAll({
      ...params,
      filters: [...(params.filters || []), { field: 'project_id', operator: 'eq', value: projectId }]
    })
  }

  async getByClient(clientId: string, params: QueryParams = {}): Promise<PaginatedResponse<FileItem>> {
    return this.findAll({
      ...params,
      filters: [...(params.filters || []), { field: 'client_id', operator: 'eq', value: clientId }]
    })
  }

  async search(query: string, params: QueryParams = {}): Promise<PaginatedResponse<FileItem>> {
    return this.findAll({
      ...params,
      filters: [{ field: 'name', operator: 'ilike', value: query }]
    })
  }
}

export const fileRepository = new FileRepository()
