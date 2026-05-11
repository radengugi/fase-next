export interface AnalyticsKPI {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: string
  color: string
}

export interface AnalyticsData {
  kpis: AnalyticsKPI[]
  projects: {
    total: number
    inProgress: number
    completed: number
    byStatus: Record<string, number>
  }
  clients: {
    total: number
    newThisMonth: number
    byIndustry: Record<string, number>
    bySize: Record<string, number>
  }
  revenue: {
    total: number
    pending: number
    paid: number
    byMonth: Record<string, number>
    byClient: Record<string, number>
  }
  team: {
    total: number
    byRole: Record<string, number>
    performance: any[]
  }
  storage: {
    totalSize: number
    totalFiles: number
    avgSize: number
  }
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  message?: string
}

const API_BASE = '/api'

export class AnalyticsApiService {
  async getAnalytics(): Promise<ApiResponse<AnalyticsData>> {
    const response = await fetch(`${API_BASE}/analytics`)
    return await response.json()
  }
}

export const analyticsApiService = new AnalyticsApiService()
