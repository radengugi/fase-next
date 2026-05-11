'use client'

import { useState, useEffect, useCallback } from 'react'
import { dashboardApiService, type DashboardStats } from '@/services/api/dashboard'

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await dashboardApiService.getStats()

      if (result.error) {
        setError(result.error)
      } else {
        setStats(result.data || null)
      }
    } catch (err) {
      setError('Failed to fetch dashboard stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  }
}
