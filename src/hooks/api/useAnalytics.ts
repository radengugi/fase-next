'use client'

import { useState, useEffect } from 'react'
import { analyticsApiService, type AnalyticsData } from '@/services/api/analytics'

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true)
      setError(null)

      try {
        const result = await analyticsApiService.getAnalytics()

        if (result.error) {
          setError(result.error)
        } else {
          setAnalytics(result.data || null)
        }
      } catch (err) {
        setError('Failed to fetch analytics')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  return {
    analytics,
    loading,
    error
  }
}
