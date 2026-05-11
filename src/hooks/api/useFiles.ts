'use client'

import { useState, useEffect, useCallback } from 'react'
import { fileApiService } from '@/services/api/files'
import type { FileItem, QueryParams } from '@/server/repositories/file.repository'
import type { PaginatedResponse } from '@/server/repositories/base.repository'

export function useFiles(initialParams: QueryParams = {}) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const fetchFiles = useCallback(async (params: QueryParams = {}) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fileApiService.getAll(params)

      if (result.error) {
        setError(result.error)
      } else {
        setFiles(result.data || [])
        setPagination(result.pagination)
      }
    } catch (err) {
      setError('Failed to fetch files')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFiles(initialParams)
  }, [])

  const refetch = useCallback((params?: QueryParams) => {
    fetchFiles(params || initialParams)
  }, [fetchFiles, initialParams])

  return {
    files,
    loading,
    error,
    pagination,
    refetch
  }
}

export function useFile(id: string) {
  const [file, setFile] = useState<FileItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFile() {
      setLoading(true)
      setError(null)

      try {
        const result = await fileApiService.getById(id)

        if (result.error) {
          setError(result.error)
        } else {
          setFile(result.data || null)
        }
      } catch (err) {
        setError('Failed to fetch file')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchFile()
    }
  }, [id])

  return {
    file,
    loading,
    error
  }
}

export function useUploadFile() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const uploadFile = useCallback(async (file: File, additionalData?: { project_id?: string; client_id?: string }) => {
    setLoading(true)
    setError(null)
    setProgress(0)

    try {
      const result = await fileApiService.upload(file, additionalData)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      setProgress(100)
      return { success: true, data: result.data }
    } catch (err) {
      setError('Failed to upload file')
      return { success: false, error: 'Failed to upload file' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    uploadFile,
    loading,
    error,
    progress
  }
}

export function useDeleteFile() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteFile = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fileApiService.delete(id)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true }
    } catch (err) {
      setError('Failed to delete file')
      return { success: false, error: 'Failed to delete file' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    deleteFile,
    loading,
    error
  }
}

export function useFileSearch() {
  const [results, setResults] = useState<FileItem[]>([])
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
      const result = await fileApiService.search(query, params)

      if (result.error) {
        setError(result.error)
      } else {
        setResults(result.data || [])
      }
    } catch (err) {
      setError('Failed to search files')
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
