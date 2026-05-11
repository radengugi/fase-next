import type { UserRole } from "./auth"

export interface TeamMember {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface CreateTeamMemberInput {
  email: string
  full_name: string
  role: UserRole
}

export interface UpdateTeamMemberInput {
  id: string
  email?: string
  full_name?: string
  role?: UserRole
}

