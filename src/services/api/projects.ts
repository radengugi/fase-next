import type {
  CreateProjectInput,
  UpdateProjectInput,
  Project,
  QueryParams
} from '@/server/repositories/project.repository'
import type {
  ApiResponse,
  PaginatedResponse
} from '@/server/repositories/base.repository'

const API_BASE = '/api'

export class ProjectApiService {
  private baseUrl = `${API_BASE}/projects`

  async getAll(params: QueryParams = {}): Promise<PaginatedResponse<Project>> {
    const queryParams = new URLSearchParams()

    if (params.pagination) {
      queryParams.append('page', (params.pagination.page ?? 1).toString())
      queryParams.append('limit', (params.pagination.limit ?? 10).toString())
    }

    if (params.sort) {
      queryParams.append('sort', params.sort.field)
      queryParams.append('order', params.sort.order)
    }

    if (params.filters) {
      params.filters.forEach(filter => {
        if (filter.field === 'status') {
          queryParams.append('status', String(filter.value))
        } else if (filter.field === 'priority') {
          queryParams.append('priority', String(filter.value))
        } else if (filter.field === 'client_id') {
          queryParams.append('client_id', String(filter.value))
        }
      })
    }

    const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const response = await fetch(url)
    return await response.json()
  }

  async getById(id: string): Promise<ApiResponse<Project>> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    return await response.json()
  }

  async create(input: CreateProjectInput): Promise<ApiResponse<Project>> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })
    return await response.json()
  }

  async update(id: string, input: UpdateProjectInput): Promise<ApiResponse<Project>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })
    return await response.json()
  }

  async delete(id: string): Promise<ApiResponse<Project>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  }

  async getByClient(clientId: string, params: QueryParams = {}): Promise<PaginatedResponse<Project>> {
    return this.getAll({
      ...params,
      filters: [...(params.filters || []), { field: 'client_id', operator: 'eq', value: clientId }]
    })
  }
}

export const projectApiService = new ProjectApiService()
