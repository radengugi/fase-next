import type {
  CmsHero, CmsAbout, CmsService, CmsPortfolio, CmsTestimonial,
  CmsTeamMember, CmsStat, CmsValue, CmsProcessStep, GlobalSetting,
  CreateCmsHeroInput, UpdateCmsHeroInput,
  CreateCmsAboutInput, UpdateCmsAboutInput,
  CreateCmsServiceInput, UpdateCmsServiceInput,
  CreateCmsPortfolioInput, UpdateCmsPortfolioInput,
  CreateCmsTestimonialInput, UpdateCmsTestimonialInput,
  CreateCmsTeamMemberInput, UpdateCmsTeamMemberInput,
  CreateCmsStatInput, UpdateCmsStatInput,
  CreateCmsValueInput, UpdateCmsValueInput,
  CreateCmsProcessStepInput, UpdateCmsProcessStepInput,
} from '@/types/cms'
import type { ApiResponse } from '@/server/repositories/base.repository'

const BASE = '/api/cms'

async function apiFetch<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(url, { cache: 'no-store', ...options })
  return res.json()
}

// Generic CRUD class for CMS endpoints
class CmsApiService<T, CreateInput, UpdateInput> {
  constructor(private endpoint: string) {}

  async getAll(admin = false): Promise<ApiResponse<T[]>> {
    return apiFetch<T[]>(`${BASE}/${this.endpoint}${admin ? '?admin=1' : ''}`)
  }

  async getById(id: string): Promise<ApiResponse<T>> {
    return apiFetch<T>(`${BASE}/${this.endpoint}/${id}`)
  }

  async create(input: CreateInput): Promise<ApiResponse<T>> {
    return apiFetch<T>(`${BASE}/${this.endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  }

  async update(id: string, input: UpdateInput): Promise<ApiResponse<T>> {
    return apiFetch<T>(`${BASE}/${this.endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  }

  async delete(id: string): Promise<ApiResponse<T>> {
    return apiFetch<T>(`${BASE}/${this.endpoint}/${id}`, { method: 'DELETE' })
  }
}

// Hero
export const cmsHeroApi = new CmsApiService<CmsHero, CreateCmsHeroInput, UpdateCmsHeroInput>('hero')

// About
class AboutApiService extends CmsApiService<CmsAbout, CreateCmsAboutInput, UpdateCmsAboutInput> {
  constructor() { super('about') }
  async getActive(): Promise<ApiResponse<CmsAbout>> {
    return apiFetch<CmsAbout>(`${BASE}/about/active`)
  }
  async getBySlug(slug: string): Promise<ApiResponse<CmsAbout>> {
    return apiFetch<CmsAbout>(`${BASE}/about?slug=${encodeURIComponent(slug)}`)
  }
}
export const cmsAboutApi = new AboutApiService()

// Services
export const cmsServicesApi = new CmsApiService<CmsService, CreateCmsServiceInput, UpdateCmsServiceInput>('services')

// Portfolio
class PortfolioApiService extends CmsApiService<CmsPortfolio, CreateCmsPortfolioInput, UpdateCmsPortfolioInput> {
  constructor() { super('portfolio') }
  async getByCategory(category: string): Promise<ApiResponse<CmsPortfolio[]>> {
    return apiFetch<CmsPortfolio[]>(`${BASE}/portfolio?category=${encodeURIComponent(category)}`)
  }
}
export const cmsPortfolioApi = new PortfolioApiService()

// Testimonials
export const cmsTestimonialsApi = new CmsApiService<CmsTestimonial, CreateCmsTestimonialInput, UpdateCmsTestimonialInput>('testimonials')

// Team
export const cmsTeamApi = new CmsApiService<CmsTeamMember, CreateCmsTeamMemberInput, UpdateCmsTeamMemberInput>('team')

// Stats
export const cmsStatsApi = new CmsApiService<CmsStat, CreateCmsStatInput, UpdateCmsStatInput>('stats')

// Values
export const cmsValuesApi = new CmsApiService<CmsValue, CreateCmsValueInput, UpdateCmsValueInput>('values')

// Process
export const cmsProcessApi = new CmsApiService<CmsProcessStep, CreateCmsProcessStepInput, UpdateCmsProcessStepInput>('process')

// Global Settings
export const cmsSettingsApi = {
  async getAll(): Promise<ApiResponse<GlobalSetting[]>> {
    return apiFetch<GlobalSetting[]>(`${BASE}/settings`)
  },
  async upsert(key: string, value: string): Promise<ApiResponse<GlobalSetting>> {
    return apiFetch<GlobalSetting>(`${BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    })
  },
  async upsertMany(settings: Record<string, string>): Promise<ApiResponse<null>> {
    return apiFetch<null>(`${BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings }),
    })
  },
}
