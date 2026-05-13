import type { UserRole } from "./auth"

export interface TeamMember {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  avatar_url: string | null
  department?: string | null
  skills?: string[] | null
  joined_date?: string
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
  avatar_url?: string | null
}

