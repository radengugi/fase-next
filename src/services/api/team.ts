import type {
  UpdateProfileInput,
  Profile,
  QueryParams
} from '@/server/repositories/profile.repository'
import type {
  ApiResponse,
  PaginatedResponse
} from '@/server/repositories/base.repository'

const API_BASE = '/api'

export class TeamApiService {
  private baseUrl = `${API_BASE}/team`

  async getAll(params: QueryParams = {}): Promise<PaginatedResponse<Profile>> {
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
        if (filter.field === 'role') {
          queryParams.append('role', String(filter.value))
        }
      })
    }

    const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const response = await fetch(url)
    return await response.json()
  }

  async getById(id: string): Promise<ApiResponse<Profile>> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    return await response.json()
  }

  async updateRole(id: string, role: string): Promise<ApiResponse<Profile>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    })
    return await response.json()
  }

  async update(id: string, input: UpdateProfileInput): Promise<ApiResponse<Profile>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })
    return await response.json()
  }

  async delete(id: string): Promise<ApiResponse<Profile>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  }

  async search(query: string, params: QueryParams = {}): Promise<PaginatedResponse<Profile>> {
    const queryParams = new URLSearchParams()
    queryParams.append('search', query)

    if (params.pagination) {
      queryParams.append('page', (params.pagination.page ?? 1).toString())
      queryParams.append('limit', (params.pagination.limit ?? 10).toString())
    }

    const url = `${this.baseUrl}?${queryParams.toString()}`
    const response = await fetch(url)
    return await response.json()
  }

  async getTeamMembers(params: QueryParams = {}): Promise<PaginatedResponse<Profile>> {
    const queryParams = new URLSearchParams()
    queryParams.append('team_only', 'true')

    if (params.pagination) {
      queryParams.append('page', (params.pagination.page ?? 1).toString())
      queryParams.append('limit', (params.pagination.limit ?? 10).toString())
    }

    const url = `${this.baseUrl}?${queryParams.toString()}`
    const response = await fetch(url)
    return await response.json()
  }
}

export const teamApiService = new TeamApiService()
