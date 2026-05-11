'use client'

import { useState, useEffect, useCallback } from 'react'
import { projectApiService } from '@/services/api/projects'
import type { Project, QueryParams } from '@/server/repositories/project.repository'
import type { PaginatedResponse } from '@/server/repositories/base.repository'

export function useProjects(initialParams: QueryParams = {}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const fetchProjects = useCallback(async (params: QueryParams = {}) => {
    setLoading(true)
    setError(null)

    try {
      const result = await projectApiService.getAll(params)

      if (result.error) {
        setError(result.error)
      } else {
        setProjects(result.data || [])
        setPagination(result.pagination)
      }
    } catch (err) {
      setError('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects(initialParams)
  }, [])

  const refetch = useCallback((params?: QueryParams) => {
    fetchProjects(params || initialParams)
  }, [fetchProjects, initialParams])

  return {
    projects,
    loading,
    error,
    pagination,
    refetch
  }
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProject() {
      setLoading(true)
      setError(null)

      try {
        const result = await projectApiService.getById(id)

        if (result.error) {
          setError(result.error)
        } else {
          setProject(result.data || null)
        }
      } catch (err) {
        setError('Failed to fetch project')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  return {
    project,
    loading,
    error
  }
}

export function useCreateProject() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createProject = useCallback(async (data: any) => {
    setLoading(true)
    setError(null)

    try {
      const result = await projectApiService.create(data)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true, data: result.data }
    } catch (err) {
      setError('Failed to create project')
      return { success: false, error: 'Failed to create project' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    createProject,
    loading,
    error
  }
}

export function useUpdateProject() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProject = useCallback(async (id: string, data: any) => {
    setLoading(true)
    setError(null)

    try {
      const result = await projectApiService.update(id, data)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true, data: result.data }
    } catch (err) {
      setError('Failed to update project')
      return { success: false, error: 'Failed to update project' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    updateProject,
    loading,
    error
  }
}

export function useDeleteProject() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteProject = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await projectApiService.delete(id)

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      return { success: true }
    } catch (err) {
      setError('Failed to delete project')
      return { success: false, error: 'Failed to delete project' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    deleteProject,
    loading,
    error
  }
}
