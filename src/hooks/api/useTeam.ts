'use client'

import { useState, useEffect, useCallback } from 'react'
import { teamApiService } from '@/services/api/team'
import type { Profile, QueryParams } from '@/server/repositories/profile.repository'
import type { PaginatedResponse } from '@/server/repositories/base.repository'

export function useTeam(initialParams: QueryParams = {}) {
  const [team, setTeam] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const fetchTeam = useCallback(async (params: QueryParams = {}) => {
    setLoading(true)
    setError(null)

    try {
      const result = await teamApiService.getTeamMembers(params)

      if (result.error) {
        setError(result.error)
      } else {
        setTeam(result.data || [])
        setPagination(result.pagination)
      }
    } catch (err) {
      setError('Failed to fetch team')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTeam(initialParams)
  }, [])

  const refetch = useCallback((params?: QueryParams) => {
    fetchTeam(params || initialParams)
  }, [fetchTeam, initialParams])

  return {
    team,
    loading,
    error,
    pagination,
    refetch
  }
}

export function useTeamMember(id: string) {
  const [member, setMember] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMember() {
      setLoading(true)
      setError(null)

      try {
        const result = await teamApiService.getById(id)

        if (result.error) {
          setError(result.error)
        } else {
          setMember(result.data || null)
        }
      } catch (err) {
        setError('Failed to fetch team member')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchMember()
    }
  }, [id])

  return {
    member,
    loading,
    error
  }
}

export function useUpdateRole() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateRole = useCallback(async (id: string, role: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await teamApiService.updateRole(id, role)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true, data: result.data }
    } catch (err) {
      setError('Failed to update role')
      return { success: false, error: 'Failed to update role' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    updateRole,
    loading,
    error
  }
}

export function useDeleteTeamMember() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteTeamMember = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await teamApiService.delete(id)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true }
    } catch (err) {
      setError('Failed to delete team member')
      return { success: false, error: 'Failed to delete team member' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    deleteTeamMember,
    loading,
    error
  }
}

export function useTeamSearch() {
  const [results, setResults] = useState<Profile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string, params?: QueryParams) => {
    if (!query) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await teamApiService.search(query, params)

      if (result.error) {
        setError(result.error)
      } else {
        setResults(result.data || [])
      }
    } catch (err) {
      setError('Failed to search team')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    results,
    loading,
    error,
    search
  }
}
