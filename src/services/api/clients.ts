import type {
  CreateClientInput,
  UpdateClientInput,
  Client
} from '@/server/repositories/client.repository'
import type {
  QueryParams,
  ApiResponse,
  PaginatedResponse
} from '@/server/repositories/base.repository'

const API_BASE = '/api'

export class ClientApiService {
  private baseUrl = `${API_BASE}/clients`

  async getAll(params: QueryParams = {}): Promise<PaginatedResponse<Client>> {
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
      params.filters.forEach((filter: any) => {
        if (filter.field === 'status') {
          queryParams.append('status', filter.value)
        }
      })
    }

    // Add cache-busting timestamp
    queryParams.append('_t', Date.now().toString())

    const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    return await response.json()
  }

  async getById(id: string): Promise<ApiResponse<Client>> {
    const response = await fetch(`${this.baseUrl}/${id}?_t=${Date.now()}`, {
      cache: 'no-store'
    })
    return await response.json()
  }

  async create(input: CreateClientInput): Promise<ApiResponse<Client>> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })
    return await response.json()
  }

  async update(id: string, input: UpdateClientInput): Promise<ApiResponse<Client>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })
    return await response.json()
  }

  async delete(id: string): Promise<ApiResponse<Client>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  }

  async search(query: string, params: QueryParams = {}): Promise<PaginatedResponse<Client>> {
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
}

export const clientApiService = new ClientApiService()
