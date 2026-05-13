import { createClient } from '@/lib/supabase/server'
import { BaseRepository, type ApiResponse, type PaginatedResponse } from './base.repository'
import type {
  CmsHero, CmsService, CmsPortfolio, CmsTestimonial,
  CmsTeamMember, CmsStat, CmsValue, CmsProcessStep, CmsAbout, GlobalSetting,
  CreateCmsHeroInput, UpdateCmsHeroInput,
  CreateCmsServiceInput, UpdateCmsServiceInput,
  CreateCmsPortfolioInput, UpdateCmsPortfolioInput,
  CreateCmsTestimonialInput, UpdateCmsTestimonialInput,
  CreateCmsTeamMemberInput, UpdateCmsTeamMemberInput,
  CreateCmsStatInput, UpdateCmsStatInput,
  CreateCmsValueInput, UpdateCmsValueInput,
  CreateCmsProcessStepInput, UpdateCmsProcessStepInput,
  CreateCmsAboutInput, UpdateCmsAboutInput,
} from '@/types/cms'

export type { ApiResponse, PaginatedResponse } from './base.repository'

// Generic CRUD helpers for CMS tables
class CmsTableRepository<T, CreateInput, UpdateInput> extends BaseRepository {
  constructor(private tableName: string, private orderBy: string = 'sort_order') { super() }

  async findAll(activeOnly = true): Promise<ApiResponse<T[]>> {
    try {
      const supabase = await createClient()
      let query = supabase.from(this.tableName as any).select('*').order(this.orderBy, { ascending: true })
      if (activeOnly) query = (query as any).eq('is_active', true)
      const { data, error } = await query
      if (error) throw error
      return { data: (data as T[]) || [], error: null }
    } catch (e: any) {
      return { data: null, error: e.message || 'Unknown error' }
    }
  }

  async findAll_admin(): Promise<ApiResponse<T[]>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from(this.tableName as any)
        .select('*')
        .order(this.orderBy, { ascending: true })
      if (error) throw error
      return { data: (data as T[]) || [], error: null }
    } catch (e: any) {
      return { data: null, error: e.message || 'Unknown error' }
    }
  }

  async findById(id: string): Promise<ApiResponse<T>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from(this.tableName as any)
        .select('*')
        .eq('id', id)
        .single()
      return this.handleResponse<T>(data as T, error)
    } catch (e: any) {
      return this.handleResponse<T>(null, e)
    }
  }

  async create(input: CreateInput): Promise<ApiResponse<T>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from(this.tableName as any)
        .insert(input as any)
        .select()
        .single()
      return this.handleResponse<T>(data as T, error)
    } catch (e: any) {
      return this.handleResponse<T>(null, e)
    }
  }

  async update(id: string, input: UpdateInput): Promise<ApiResponse<T>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from(this.tableName as any)
        .update(input as any)
        .eq('id', id)
        .select()
        .single()
      return this.handleResponse<T>(data as T, error)
    } catch (e: any) {
      return this.handleResponse<T>(null, e)
    }
  }

  async delete(id: string): Promise<ApiResponse<T>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from(this.tableName as any)
        .delete()
        .eq('id', id)
        .select()
        .single()
      if (error) return { data: null, error: error.message }
      return { data: data as T, error: null }
    } catch (e: any) {
      return { data: null, error: e.message || 'Unknown error' }
    }
  }

  async reorder(ids: string[]): Promise<ApiResponse<null>> {
    try {
      const supabase = await createClient()
      const updates = ids.map((id, index) => ({ id, sort_order: index }))
      for (const update of updates) {
        await supabase.from(this.tableName as any).update({ sort_order: update.sort_order }).eq('id', update.id)
      }
      return { data: null, error: null }
    } catch (e: any) {
      return { data: null, error: e.message || 'Unknown error' }
    }
  }
}

// Specialized portfolio with category filter
class PortfolioRepository extends CmsTableRepository<CmsPortfolio, CreateCmsPortfolioInput, UpdateCmsPortfolioInput> {
  constructor() { super('cms_portfolio', 'created_at') }

  async findByCategory(category: string): Promise<ApiResponse<CmsPortfolio[]>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('cms_portfolio')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('created_at', { ascending: true })
      if (error) throw error
      return { data: data || [], error: null }
    } catch (e: any) {
      return { data: null, error: e.message || 'Unknown error' }
    }
  }
}

// Global settings repository
class GlobalSettingsRepository extends BaseRepository {
  async getAll(): Promise<ApiResponse<GlobalSetting[]>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase.from('global_settings').select('*').order('key')
      if (error) throw error
      return { data: data || [], error: null }
    } catch (e: any) {
      return { data: null, error: e.message || 'Unknown error' }
    }
  }

  async getByKey(key: string): Promise<string | null> {
    try {
      const supabase = await createClient()
      const { data } = await supabase.from('global_settings').select('value').eq('key', key).single()
      return data?.value ?? null
    } catch {
      return null
    }
  }

  async getMap(): Promise<Record<string, string>> {
    try {
      const supabase = await createClient()
      const { data } = await supabase.from('global_settings').select('key, value')
      const map: Record<string, string> = {}
      if (data) data.forEach((row: any) => { map[row.key] = row.value ?? '' })
      return map
    } catch {
      return {}
    }
  }

  async upsert(key: string, value: string): Promise<ApiResponse<GlobalSetting>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('global_settings')
        .upsert({ key, value }, { onConflict: 'key' })
        .select()
        .single()
      return this.handleResponse<GlobalSetting>(data, error)
    } catch (e: any) {
      return this.handleResponse<GlobalSetting>(null, e)
    }
  }

  async upsertMany(settings: Record<string, string>): Promise<ApiResponse<null>> {
    try {
      const supabase = await createClient()
      const rows = Object.entries(settings).map(([key, value]) => ({ key, value }))
      const { error } = await supabase.from('global_settings').upsert(rows, { onConflict: 'key' })
      if (error) throw error
      return { data: null, error: null }
    } catch (e: any) {
      return { data: null, error: e.message || 'Unknown error' }
    }
  }
}

// Hero repository with getActive method
class HeroRepository extends CmsTableRepository<CmsHero, CreateCmsHeroInput, UpdateCmsHeroInput> {
  constructor() { super('cms_hero') }

  async getActive(): Promise<CmsHero | null> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('cms_hero')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(1)
        .single()
      if (error) throw error
      return data as CmsHero
    } catch {
      return null
    }
  }
}

// About repository (singleton with slug 'about')
class AboutRepository extends CmsTableRepository<CmsAbout, CreateCmsAboutInput, UpdateCmsAboutInput> {
  constructor() { super('cms_about') }

  async getActive(): Promise<CmsAbout | null> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('cms_about')
        .select('*')
        .eq('slug', 'about')
        .eq('is_active', true)
        .single()
      if (error) throw error
      return data as CmsAbout
    } catch {
      return null
    }
  }

  async findBySlug(slug: string): Promise<ApiResponse<CmsAbout>> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('cms_about')
        .select('*')
        .eq('slug', slug)
        .single()
      return this.handleResponse<CmsAbout>(data, error)
    } catch (e: any) {
      return this.handleResponse<CmsAbout>(null, e)
    }
  }
}

// Export repository instances
export const cmsHeroRepository = new HeroRepository()
export const cmsAboutRepository = new AboutRepository()
export const cmsServicesRepository = new CmsTableRepository<CmsService, CreateCmsServiceInput, UpdateCmsServiceInput>('cms_services', 'created_at')
export const cmsPortfolioRepository = new PortfolioRepository()
export const cmsTestimonialsRepository = new CmsTableRepository<CmsTestimonial, CreateCmsTestimonialInput, UpdateCmsTestimonialInput>('cms_testimonials')
export const cmsTeamRepository = new CmsTableRepository<CmsTeamMember, CreateCmsTeamMemberInput, UpdateCmsTeamMemberInput>('cms_team_members', 'created_at')
export const cmsStatsRepository = new CmsTableRepository<CmsStat, CreateCmsStatInput, UpdateCmsStatInput>('cms_stats')
export const cmsValuesRepository = new CmsTableRepository<CmsValue, CreateCmsValueInput, UpdateCmsValueInput>('cms_values', 'created_at')
export const cmsProcessRepository = new CmsTableRepository<CmsProcessStep, CreateCmsProcessStepInput, UpdateCmsProcessStepInput>('cms_process_steps')
export const globalSettingsRepository = new GlobalSettingsRepository()
