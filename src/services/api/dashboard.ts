export interface DashboardStats {
  projects: {
    total: number
    inProgress: number
    completed: number
  }
  clients: {
    total: number
  }
  revenue: {
    total: number
    thisMonth: number
  }
  tasks: {
    total: number
    completed: number
    pending: number
  }
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  message?: string
}

const API_BASE = '/api'

export class DashboardApiService {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    const response = await fetch(`${API_BASE}/dashboard/stats`)
    return await response.json()
  }
}

export const dashboardApiService = new DashboardApiService()
