export interface CmsHero {
  id: string
  headline: string
  subheadline: string | null
  cta_primary_label: string | null
  cta_primary_href: string | null
  cta_secondary_label: string | null
  cta_secondary_href: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CmsService {
  id: string
  slug: string
  icon: string
  title: string
  description: string | null
  color: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CmsPortfolio {
  id: string
  title: string
  category: string
  description: string | null
  tags: string[]
  image_url: string | null
  year: string | null
  client_name: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CmsTestimonial {
  id: string
  name: string
  role: string | null
  company: string | null
  quote: string
  avatar_url: string | null
  rating: number
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}


export interface CmsTeamMember {
  id: string
  name: string
  role: string
  bio: string | null
  avatar_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  github_url: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CmsFaq {
  id: string
  question: string
  answer: string
  category: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CmsStat {
  id: string
  value: string
  suffix: string | null
  label: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CmsValue {
  id: string
  icon: string
  title: string
  description: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CmsProcessStep {
  id: string
  number: string
  title: string
  description: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CmsAbout {
  id: string
  slug: string
  hero_headline: string
  hero_description: string | null
  hero_badge: string | null
  story_badge: string | null
  story_title: string | null
  story_content: string | null
  founded_year: string | null
  countries: string | null
  team_members: string | null
  awards: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface GlobalSetting {
  id: string
  key: string
  value: string | null
  created_at: string
  updated_at: string
}

// Input types
export type CreateCmsHeroInput = Omit<CmsHero, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsHeroInput = Partial<CreateCmsHeroInput>

export type CreateCmsServiceInput = Omit<CmsService, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsServiceInput = Partial<CreateCmsServiceInput>

export type CreateCmsPortfolioInput = Omit<CmsPortfolio, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsPortfolioInput = Partial<CreateCmsPortfolioInput>

export type CreateCmsTestimonialInput = Omit<CmsTestimonial, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsTestimonialInput = Partial<CreateCmsTestimonialInput>


export type CreateCmsTeamMemberInput = Omit<CmsTeamMember, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsTeamMemberInput = Partial<CreateCmsTeamMemberInput>

export type CreateCmsFaqInput = Omit<CmsFaq, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsFaqInput = Partial<CreateCmsFaqInput>

export type CreateCmsStatInput = Omit<CmsStat, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsStatInput = Partial<CreateCmsStatInput>

export type CreateCmsValueInput = Omit<CmsValue, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsValueInput = Partial<CreateCmsValueInput>

export type CreateCmsProcessStepInput = Omit<CmsProcessStep, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsProcessStepInput = Partial<CreateCmsProcessStepInput>

export type CreateCmsAboutInput = Omit<CmsAbout, 'id' | 'created_at' | 'updated_at'>
export type UpdateCmsAboutInput = Partial<CreateCmsAboutInput>
