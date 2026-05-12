import {
  cmsHeroRepository,
  cmsAboutRepository,
  cmsServicesRepository,
  cmsPortfolioRepository,
  cmsTestimonialsRepository,
  cmsTeamRepository,
  cmsFaqRepository,
  cmsStatsRepository,
  cmsValuesRepository,
  cmsProcessRepository,
  globalSettingsRepository,
} from '../repositories/cms.repository'
import type {
  CreateCmsHeroInput, UpdateCmsHeroInput,
  CreateCmsAboutInput, UpdateCmsAboutInput,
  CreateCmsServiceInput, UpdateCmsServiceInput,
  CreateCmsPortfolioInput, UpdateCmsPortfolioInput,
  CreateCmsTestimonialInput, UpdateCmsTestimonialInput,
  CreateCmsTeamMemberInput, UpdateCmsTeamMemberInput,
  CreateCmsFaqInput, UpdateCmsFaqInput,
  CreateCmsStatInput, UpdateCmsStatInput,
  CreateCmsValueInput, UpdateCmsValueInput,
  CreateCmsProcessStepInput, UpdateCmsProcessStepInput,
} from '@/types/cms'

// Hero
export class CmsHeroService {
  async getActive() { return cmsHeroRepository.findAll(true) }
  async getAll() { return cmsHeroRepository.findAll_admin() }
  async getById(id: string) { return cmsHeroRepository.findById(id) }
  async create(input: CreateCmsHeroInput) { return cmsHeroRepository.create(input) }
  async update(id: string, input: UpdateCmsHeroInput) { return cmsHeroRepository.update(id, input) }
  async delete(id: string) { return cmsHeroRepository.delete(id) }
}

// About
export class CmsAboutService {
  async getActive() { return cmsAboutRepository.getActive() }
  async getAll() { return cmsAboutRepository.findAll_admin() }
  async getBySlug(slug: string) { return cmsAboutRepository.findBySlug(slug) }
  async getById(id: string) { return cmsAboutRepository.findById(id) }
  async create(input: CreateCmsAboutInput) {
    if (!input.slug?.trim()) return { data: null, error: 'Slug is required' }
    return cmsAboutRepository.create(input)
  }
  async update(id: string, input: UpdateCmsAboutInput) { return cmsAboutRepository.update(id, input) }
  async delete(id: string) { return cmsAboutRepository.delete(id) }
}

// Services
export class CmsServicesService {
  async getActive() { return cmsServicesRepository.findAll(true) }
  async getAll() { return cmsServicesRepository.findAll_admin() }
  async getById(id: string) { return cmsServicesRepository.findById(id) }
  async create(input: CreateCmsServiceInput) {
    if (!input.slug?.trim()) return { data: null, error: 'Slug is required' }
    if (!input.title?.trim()) return { data: null, error: 'Title is required' }
    return cmsServicesRepository.create(input)
  }
  async update(id: string, input: UpdateCmsServiceInput) { return cmsServicesRepository.update(id, input) }
  async delete(id: string) { return cmsServicesRepository.delete(id) }
  async reorder(ids: string[]) { return cmsServicesRepository.reorder(ids) }
}

// Portfolio
export class CmsPortfolioService {
  async getActive() { return cmsPortfolioRepository.findAll(true) }
  async getAll() { return cmsPortfolioRepository.findAll_admin() }
  async getById(id: string) { return cmsPortfolioRepository.findById(id) }
  async getByCategory(category: string) { return cmsPortfolioRepository.findByCategory(category) }
  async create(input: CreateCmsPortfolioInput) {
    if (!input.title?.trim()) return { data: null, error: 'Title is required' }
    return cmsPortfolioRepository.create(input)
  }
  async update(id: string, input: UpdateCmsPortfolioInput) { return cmsPortfolioRepository.update(id, input) }
  async delete(id: string) { return cmsPortfolioRepository.delete(id) }
  async reorder(ids: string[]) { return cmsPortfolioRepository.reorder(ids) }
}

// Testimonials
export class CmsTestimonialsService {
  async getActive() { return cmsTestimonialsRepository.findAll(true) }
  async getAll() { return cmsTestimonialsRepository.findAll_admin() }
  async getById(id: string) { return cmsTestimonialsRepository.findById(id) }
  async create(input: CreateCmsTestimonialInput) {
    if (!input.name?.trim()) return { data: null, error: 'Name is required' }
    if (!input.quote?.trim()) return { data: null, error: 'Quote is required' }
    return cmsTestimonialsRepository.create(input)
  }
  async update(id: string, input: UpdateCmsTestimonialInput) { return cmsTestimonialsRepository.update(id, input) }
  async delete(id: string) { return cmsTestimonialsRepository.delete(id) }
  async reorder(ids: string[]) { return cmsTestimonialsRepository.reorder(ids) }
}

// Team
export class CmsTeamService {
  async getActive() { return cmsTeamRepository.findAll(true) }
  async getAll() { return cmsTeamRepository.findAll_admin() }
  async getById(id: string) { return cmsTeamRepository.findById(id) }
  async create(input: CreateCmsTeamMemberInput) {
    if (!input.name?.trim()) return { data: null, error: 'Name is required' }
    return cmsTeamRepository.create(input)
  }
  async update(id: string, input: UpdateCmsTeamMemberInput) { return cmsTeamRepository.update(id, input) }
  async delete(id: string) { return cmsTeamRepository.delete(id) }
  async reorder(ids: string[]) { return cmsTeamRepository.reorder(ids) }
}

// FAQs
export class CmsFaqService {
  async getActive() { return cmsFaqRepository.findAll(true) }
  async getAll() { return cmsFaqRepository.findAll_admin() }
  async getById(id: string) { return cmsFaqRepository.findById(id) }
  async create(input: CreateCmsFaqInput) {
    if (!input.question?.trim()) return { data: null, error: 'Question is required' }
    if (!input.answer?.trim()) return { data: null, error: 'Answer is required' }
    return cmsFaqRepository.create(input)
  }
  async update(id: string, input: UpdateCmsFaqInput) { return cmsFaqRepository.update(id, input) }
  async delete(id: string) { return cmsFaqRepository.delete(id) }
  async reorder(ids: string[]) { return cmsFaqRepository.reorder(ids) }
}

// Stats
export class CmsStatsService {
  async getActive() { return cmsStatsRepository.findAll(true) }
  async getAll() { return cmsStatsRepository.findAll_admin() }
  async getById(id: string) { return cmsStatsRepository.findById(id) }
  async create(input: CreateCmsStatInput) {
    if (!input.value?.trim()) return { data: null, error: 'Value is required' }
    if (!input.label?.trim()) return { data: null, error: 'Label is required' }
    return cmsStatsRepository.create(input)
  }
  async update(id: string, input: UpdateCmsStatInput) { return cmsStatsRepository.update(id, input) }
  async delete(id: string) { return cmsStatsRepository.delete(id) }
  async reorder(ids: string[]) { return cmsStatsRepository.reorder(ids) }
}

// Values
export class CmsValuesService {
  async getActive() { return cmsValuesRepository.findAll(true) }
  async getAll() { return cmsValuesRepository.findAll_admin() }
  async getById(id: string) { return cmsValuesRepository.findById(id) }
  async create(input: CreateCmsValueInput) {
    if (!input.title?.trim()) return { data: null, error: 'Title is required' }
    return cmsValuesRepository.create(input)
  }
  async update(id: string, input: UpdateCmsValueInput) { return cmsValuesRepository.update(id, input) }
  async delete(id: string) { return cmsValuesRepository.delete(id) }
  async reorder(ids: string[]) { return cmsValuesRepository.reorder(ids) }
}

// Process
export class CmsProcessService {
  async getActive() { return cmsProcessRepository.findAll(true) }
  async getAll() { return cmsProcessRepository.findAll_admin() }
  async getById(id: string) { return cmsProcessRepository.findById(id) }
  async create(input: CreateCmsProcessStepInput) {
    if (!input.title?.trim()) return { data: null, error: 'Title is required' }
    return cmsProcessRepository.create(input)
  }
  async update(id: string, input: UpdateCmsProcessStepInput) { return cmsProcessRepository.update(id, input) }
  async delete(id: string) { return cmsProcessRepository.delete(id) }
  async reorder(ids: string[]) { return cmsProcessRepository.reorder(ids) }
}

// Global settings
export class GlobalSettingsService {
  async getAll() { return globalSettingsRepository.getAll() }
  async getMap() { return globalSettingsRepository.getMap() }
  async getByKey(key: string) { return globalSettingsRepository.getByKey(key) }
  async upsert(key: string, value: string) { return globalSettingsRepository.upsert(key, value) }
  async upsertMany(settings: Record<string, string>) { return globalSettingsRepository.upsertMany(settings) }
}

// Singleton service instances
export const cmsHeroService = new CmsHeroService()
export const cmsAboutService = new CmsAboutService()
export const cmsServicesService = new CmsServicesService()
export const cmsPortfolioService = new CmsPortfolioService()
export const cmsTestimonialsService = new CmsTestimonialsService()
export const cmsTeamService = new CmsTeamService()
export const cmsFaqService = new CmsFaqService()
export const cmsStatsService = new CmsStatsService()
export const cmsValuesService = new CmsValuesService()
export const cmsProcessService = new CmsProcessService()
export const globalSettingsService = new GlobalSettingsService()
