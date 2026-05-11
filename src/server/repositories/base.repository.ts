import { PostgrestError } from '@supabase/supabase-js'

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface FilterParams {
  field: string
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike'
  value: unknown
}

export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

export interface QueryParams {
  pagination?: PaginationParams
  filters?: FilterParams[]
  sort?: SortParams
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export abstract class BaseRepository {
  protected handleResponse<T>(
    data: T | null,
    error: PostgrestError | Error | string | null
  ): ApiResponse<T> {
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'Unknown error'
      console.error('Database error:', error)
      return {
        data: null,
        error: errorMessage,
        message: 'Database operation failed'
      }
    }

    return {
      data,
      error: null
    }
  }

  protected buildQuery(params: QueryParams) {
    const query: Record<string, unknown> = {}

    if (params.filters) {
      params.filters.forEach(filter => {
        query[filter.field] = { [filter.operator]: filter.value }
      })
    }

    if (params.sort) {
      query.order = { field: params.sort.field, order: params.sort.order }
    }

    return query
  }
}
