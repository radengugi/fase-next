'use client'

import { useState, useEffect, useCallback } from 'react'
import { invoiceApiService } from '@/services/api/invoices'
import type { Invoice, QueryParams } from '@/server/repositories/invoice.repository'
import type { PaginatedResponse } from '@/server/repositories/base.repository'

export function useInvoices(initialParams: QueryParams = {}) {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const fetchInvoices = useCallback(async (params: QueryParams = {}) => {
    setLoading(true)
    setError(null)

    try {
      const result = await invoiceApiService.getAll(params)

      if (result.error) {
        setError(result.error)
      } else {
        setInvoices(result.data || [])
        setPagination(result.pagination)
      }
    } catch (err) {
      setError('Failed to fetch invoices')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInvoices(initialParams)
  }, [])

  const refetch = useCallback((params?: QueryParams) => {
    fetchInvoices(params || initialParams)
  }, [fetchInvoices, initialParams])

  return {
    invoices,
    loading,
    error,
    pagination,
    refetch
  }
}

export function useInvoice(id: string) {
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInvoice() {
      setLoading(true)
      setError(null)

      try {
        const result = await invoiceApiService.getById(id)

        if (result.error) {
          setError(result.error)
        } else {
          setInvoice(result.data || null)
        }
      } catch (err) {
        setError('Failed to fetch invoice')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchInvoice()
    }
  }, [id])

  return {
    invoice,
    loading,
    error
  }
}

export function useCreateInvoice() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createInvoice = useCallback(async (data: any) => {
    setLoading(true)
    setError(null)

    try {
      const result = await invoiceApiService.create(data)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true, data: result.data }
    } catch (err) {
      setError('Failed to create invoice')
      return { success: false, error: 'Failed to create invoice' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    createInvoice,
    loading,
    error
  }
}

export function useUpdateInvoice() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateInvoice = useCallback(async (id: string, data: any) => {
    setLoading(true)
    setError(null)

    try {
      const result = await invoiceApiService.update(id, data)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true, data: result.data }
    } catch (err) {
      setError('Failed to update invoice')
      return { success: false, error: 'Failed to update invoice' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    updateInvoice,
    loading,
    error
  }
}

export function useDeleteInvoice() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteInvoice = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await invoiceApiService.delete(id)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true }
    } catch (err) {
      setError('Failed to delete invoice')
      return { success: false, error: 'Failed to delete invoice' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    deleteInvoice,
    loading,
    error
  }
}

export function useMarkAsPaid() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const markAsPaid = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await invoiceApiService.markAsPaid(id)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true, data: result.data }
    } catch (err) {
      setError('Failed to mark invoice as paid')
      return { success: false, error: 'Failed to mark invoice as paid' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    markAsPaid,
    loading,
    error
  }
}
