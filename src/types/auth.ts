export type UserRole = "super_admin" | "admin" | "project_manager" | "developer" | "designer" | "client"

export interface User {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  avatar_url: string | null
  department: string | null
  skills: string[] | null
  joined_date: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export const roleHierarchy: Record<UserRole, number> = {
  super_admin: 6,
  admin: 5,
  project_manager: 4,
  developer: 3,
  designer: 3,
  client: 1
}

export const roleLabels: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  project_manager: "Project Manager",
  developer: "Developer",
  designer: "Designer",
  client: "Client"
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export function canAccessAdminPanel(role: UserRole): boolean {
  return role !== "client"
}
