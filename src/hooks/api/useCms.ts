'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  cmsHeroApi, cmsAboutApi, cmsServicesApi, cmsPortfolioApi, cmsTestimonialsApi,
  cmsTeamApi, cmsStatsApi, cmsValuesApi,
  cmsProcessApi, cmsSettingsApi,
} from '@/services/api/cms'
import type {
  CmsHero, CmsAbout, CmsService, CmsPortfolio, CmsTestimonial,
  CmsTeamMember, CmsStat, CmsValue, CmsProcessStep, GlobalSetting,
} from '@/types/cms'

// Generic list hook factory
function makeListHook<T>(fetcher: (admin: boolean) => Promise<{ data: T[] | null; error: string | null }>) {
  return function useList(admin = false) {
    const [items, setItems] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const hasFetchedRef = useRef(false)

    const fetch = useCallback(async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetcher(admin)
        if (result.error) setError(result.error)
        else setItems(result.data || [])
      } catch {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }, [admin])

    useEffect(() => {
      if (!hasFetchedRef.current) {
        hasFetchedRef.current = true
        fetch()
      }
    }, [fetch])

    return { items, loading, error, refetch: fetch }
  }
}

// Generic mutation hook factory
function makeMutationHook<TInput, TResult>(mutator: (input: TInput) => Promise<{ data: TResult | null; error: string | null }>) {
  return function useMutation() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const mutate = useCallback(async (input: TInput) => {
      setLoading(true)
      setError(null)
      try {
        const result = await mutator(input)
        if (result.error) {
          setError(result.error)
          return { success: false as const, error: result.error }
        }
        return { success: true as const, data: result.data }
      } catch (e: any) {
        const msg = e?.message || 'Operation failed'
        setError(msg)
        return { success: false as const, error: msg }
      } finally {
        setLoading(false)
      }
    }, [])

    return { mutate, loading, error }
  }
}

// Hero hooks
export const useCmsHero = makeListHook<CmsHero>((admin) => cmsHeroApi.getAll(admin))
export function useUpdateCmsHero() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const update = useCallback(async (id: string, data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsHeroApi.update(id, data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { update, loading, error }
}

// About hooks
export function useCmsAbout(admin = false) {
  const [items, setItems] = useState<CmsAbout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetchedRef = useRef(false)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await cmsAboutApi.getAll(admin)
      if (result.error) setError(result.error)
      else setItems(result.data || [])
    } catch {
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [admin])

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true
      fetch()
    }
  }, [fetch])

  return { items, loading, error, refetch: fetch }
}

export function useCmsAboutActive() {
  const [item, setItem] = useState<CmsAbout | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetchedRef = useRef(false)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await cmsAboutApi.getActive()
      if (result.error) setError(result.error)
      else setItem(result.data || null)
    } catch {
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true
      fetch()
    }
  }, [fetch])

  return { item, loading, error, refetch: fetch }
}

export function useCreateCmsAbout() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const create = useCallback(async (data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsAboutApi.create(data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { create, loading, error }
}

export function useUpdateCmsAbout() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const update = useCallback(async (id: string, data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsAboutApi.update(id, data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { update, loading, error }
}

export function useDeleteCmsAbout() {
  const [loading, setLoading] = useState(false)
  const del = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const result = await cmsAboutApi.delete(id)
      if (result.error) return { success: false as const, error: result.error }
      return { success: true as const }
    } catch (e: any) { return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { del, loading }
}

// Services hooks
export const useCmsServices = makeListHook<CmsService>((admin) => cmsServicesApi.getAll(admin))
export function useCreateCmsService() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const create = useCallback(async (data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsServicesApi.create(data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { create, loading, error }
}
export function useUpdateCmsService() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const update = useCallback(async (id: string, data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsServicesApi.update(id, data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { update, loading, error }
}
export function useDeleteCmsService() {
  const [loading, setLoading] = useState(false)
  const del = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const result = await cmsServicesApi.delete(id)
      if (result.error) return { success: false as const, error: result.error }
      return { success: true as const }
    } catch (e: any) { return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { del, loading }
}

// Portfolio hooks
export const useCmsPortfolio = makeListHook<CmsPortfolio>((admin) => cmsPortfolioApi.getAll(admin))
export function useCreateCmsPortfolio() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const create = useCallback(async (data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsPortfolioApi.create(data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { create, loading, error }
}
export function useUpdateCmsPortfolio() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const update = useCallback(async (id: string, data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsPortfolioApi.update(id, data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { update, loading, error }
}
export function useDeleteCmsPortfolio() {
  const [loading, setLoading] = useState(false)
  const del = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const result = await cmsPortfolioApi.delete(id)
      if (result.error) return { success: false as const, error: result.error }
      return { success: true as const }
    } catch (e: any) { return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { del, loading }
}

// Testimonials hooks
export const useCmsTestimonials = makeListHook<CmsTestimonial>((admin) => cmsTestimonialsApi.getAll(admin))
export function useCreateCmsTestimonial() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const create = useCallback(async (data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsTestimonialsApi.create(data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { create, loading, error }
}
export function useUpdateCmsTestimonial() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const update = useCallback(async (id: string, data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsTestimonialsApi.update(id, data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { update, loading, error }
}
export function useDeleteCmsTestimonial() {
  const [loading, setLoading] = useState(false)
  const del = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const result = await cmsTestimonialsApi.delete(id)
      if (result.error) return { success: false as const, error: result.error }
      return { success: true as const }
    } catch (e: any) { return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { del, loading }
}

// Team hooks
export const useCmsTeam = makeListHook<CmsTeamMember>((admin) => cmsTeamApi.getAll(admin))
export function useCreateCmsTeamMember() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const create = useCallback(async (data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsTeamApi.create(data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { create, loading, error }
}
export function useUpdateCmsTeamMember() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const update = useCallback(async (id: string, data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsTeamApi.update(id, data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { update, loading, error }
}
export function useDeleteCmsTeamMember() {
  const [loading, setLoading] = useState(false)
  const del = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const result = await cmsTeamApi.delete(id)
      if (result.error) return { success: false as const, error: result.error }
      return { success: true as const }
    } catch (e: any) { return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { del, loading }
}

// Stats hooks
export const useCmsStats = makeListHook<CmsStat>((admin) => cmsStatsApi.getAll(admin))
export function useCreateCmsStat() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const create = useCallback(async (data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsStatsApi.create(data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { create, loading, error }
}
export function useUpdateCmsStat() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const update = useCallback(async (id: string, data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsStatsApi.update(id, data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { update, loading, error }
}
export function useDeleteCmsStat() {
  const [loading, setLoading] = useState(false)
  const del = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const result = await cmsStatsApi.delete(id)
      if (result.error) return { success: false as const, error: result.error }
      return { success: true as const }
    } catch (e: any) { return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { del, loading }
}

// Values hooks
export const useCmsValues = makeListHook<CmsValue>((admin) => cmsValuesApi.getAll(admin))
export function useCreateCmsValue() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const create = useCallback(async (data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsValuesApi.create(data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { create, loading, error }
}
export function useUpdateCmsValue() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const update = useCallback(async (id: string, data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsValuesApi.update(id, data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { update, loading, error }
}
export function useDeleteCmsValue() {
  const [loading, setLoading] = useState(false)
  const del = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const result = await cmsValuesApi.delete(id)
      if (result.error) return { success: false as const, error: result.error }
      return { success: true as const }
    } catch (e: any) { return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { del, loading }
}

// Process hooks
export const useCmsProcess = makeListHook<CmsProcessStep>((admin) => cmsProcessApi.getAll(admin))
export function useCreateCmsProcess() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const create = useCallback(async (data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsProcessApi.create(data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { create, loading, error }
}
export function useUpdateCmsProcess() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const update = useCallback(async (id: string, data: any) => {
    setLoading(true); setError(null)
    try {
      const result = await cmsProcessApi.update(id, data)
      if (result.error) { setError(result.error); return { success: false as const, error: result.error } }
      return { success: true as const, data: result.data }
    } catch (e: any) { setError(e.message); return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { update, loading, error }
}
export function useDeleteCmsProcess() {
  const [loading, setLoading] = useState(false)
  const del = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const result = await cmsProcessApi.delete(id)
      if (result.error) return { success: false as const, error: result.error }
      return { success: true as const }
    } catch (e: any) { return { success: false as const, error: e.message } }
    finally { setLoading(false) }
  }, [])
  return { del, loading }
}

// Settings hooks
export function useCmsSettings() {
  const [settings, setSettings] = useState<GlobalSetting[]>([])
  const [settingsMap, setSettingsMap] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetchedRef = useRef(false)

  const fetch = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const result = await cmsSettingsApi.getAll()
      if (result.error) setError(result.error)
      else {
        const data = result.data || []
        setSettings(data)
        const map: Record<string, string> = {}
        data.forEach(s => { map[s.key] = s.value ?? '' })
        setSettingsMap(map)
      }
    } catch { setError('Failed to fetch settings') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true
      fetch()
    }
  }, [fetch])

  const save = useCallback(async (data: Record<string, string>) => {
    try {
      const result = await cmsSettingsApi.upsertMany(data)
      if (result.error) return { success: false as const, error: result.error }
      await fetch()
      return { success: true as const }
    } catch (e: any) { return { success: false as const, error: e.message } }
  }, [fetch])

  return { settings, settingsMap, loading, error, refetch: fetch, save }
}
