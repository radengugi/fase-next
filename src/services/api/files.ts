import type {
  CreateFileInput,
  FileItem,
  QueryParams
} from '@/server/repositories/file.repository'
import type {
  ApiResponse,
  PaginatedResponse
} from '@/server/repositories/base.repository'

const API_BASE = '/api'

export class FileApiService {
  private baseUrl = `${API_BASE}/files`

  async getAll(params: QueryParams = {}): Promise<PaginatedResponse<FileItem>> {
    const queryParams = new URLSearchParams()

    if (params.pagination) {
      queryParams.append('page', params.pagination.page.toString())
      queryParams.append('limit', params.pagination.limit.toString())
    }

    if (params.sort) {
      queryParams.append('sort', params.sort.field)
      queryParams.append('order', params.sort.order)
    }

    if (params.filters) {
      params.filters.forEach(filter => {
        if (filter.field === 'project_id') {
          queryParams.append('project_id', filter.value)
        } else if (filter.field === 'client_id') {
          queryParams.append('client_id', filter.value)
        }
      })
    }

    const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const response = await fetch(url)
    return await response.json()
  }

  async getById(id: string): Promise<ApiResponse<FileItem>> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    return await response.json()
  }

  async upload(file: File, additionalData?: { project_id?: string; client_id?: string }): Promise<ApiResponse<FileItem>> {
    const formData = new FormData()
    formData.append('file', file)
    if (additionalData?.project_id) {
      formData.append('project_id', additionalData.project_id)
    }
    if (additionalData?.client_id) {
      formData.append('client_id', additionalData.client_id)
    }

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: formData
    })
    return await response.json()
  }

  async delete(id: string): Promise<ApiResponse<FileItem>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  }

  async getByProject(projectId: string, params: QueryParams = {}): Promise<PaginatedResponse<FileItem>> {
    return this.getAll({
      ...params,
      filters: [...(params.filters || []), { field: 'project_id', operator: 'eq', value: projectId }]
    })
  }

  async getByClient(clientId: string, params: QueryParams = {}): Promise<PaginatedResponse<FileItem>> {
    return this.getAll({
      ...params,
      filters: [...(params.filters || []), { field: 'client_id', operator: 'eq', value: clientId }]
    })
  }

  async search(query: string, params: QueryParams = {}): Promise<PaginatedResponse<FileItem>> {
    const queryParams = new URLSearchParams()
    queryParams.append('search', query)

    if (params.pagination) {
      queryParams.append('page', params.pagination.page.toString())
      queryParams.append('limit', params.pagination.limit.toString())
    }

    const url = `${this.baseUrl}?${queryParams.toString()}`
    const response = await fetch(url)
    return await response.json()
  }
}

export const fileApiService = new FileApiService()
