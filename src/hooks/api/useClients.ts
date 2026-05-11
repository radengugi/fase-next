'use client'

import { useState, useEffect, useCallback } from 'react'
import { clientApiService } from '@/services/api/clients'
import type { Client, QueryParams } from '@/server/repositories/client.repository'
import type { PaginatedResponse } from '@/server/repositories/base.repository'

export function useClients(initialParams: QueryParams = {}) {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const fetchClients = useCallback(async (params: QueryParams = {}) => {
    setLoading(true)
    setError(null)

    try {
      const result = await clientApiService.getAll(params)

      if (result.error) {
        setError(result.error)
      } else {
        setClients(result.data || [])
        setPagination(result.pagination)
      }
    } catch (err) {
      setError('Failed to fetch clients')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClients(initialParams)
  }, [])

  const refetch = useCallback((params?: QueryParams) => {
    fetchClients(params || initialParams)
  }, [fetchClients, initialParams])

  return {
    clients,
    loading,
    error,
    pagination,
    refetch
  }
}

export function useClient(id: string) {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchClient() {
      setLoading(true)
      setError(null)

      try {
        const result = await clientApiService.getById(id)

        if (result.error) {
          setError(result.error)
        } else {
          setClient(result.data || null)
        }
      } catch (err) {
        setError('Failed to fetch client')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchClient()
    }
  }, [id])

  return {
    client,
    loading,
    error
  }
}

export function useCreateClient() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createClient = useCallback(async (data: any) => {
    setLoading(true)
    setError(null)

    try {
      const result = await clientApiService.create(data)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true, data: result.data }
    } catch (err) {
      setError('Failed to create client')
      return { success: false, error: 'Failed to create client' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    createClient,
    loading,
    error
  }
}

export function useUpdateClient() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateClient = useCallback(async (id: string, data: any) => {
    setLoading(true)
    setError(null)

    try {
      const result = await clientApiService.update(id, data)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true, data: result.data }
    } catch (err) {
      setError('Failed to update client')
      return { success: false, error: 'Failed to update client' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    updateClient,
    loading,
    error
  }
}

export function useDeleteClient() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteClient = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await clientApiService.delete(id)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true }
    } catch (err) {
      setError('Failed to delete client')
      return { success: false, error: 'Failed to delete client' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    deleteClient,
    loading,
    error
  }
}

export function useClientSearch() {
  const [results, setResults] = useState<Client[]>([])
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
      const result = await clientApiService.search(query, params)

      if (result.error) {
        setError(result.error)
      } else {
        setResults(result.data || [])
      }
    } catch (err) {
      setError('Failed to search clients')
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
