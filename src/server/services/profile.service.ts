import { profileRepository, type UpdateProfileInput } from '../repositories/profile.repository'
import type { QueryParams, ApiResponse } from '../repositories/base.repository'
import type { Profile, UserRole } from '../repositories/profile.repository'

export class ProfileService {
  async getAllProfiles(params: QueryParams = {}) {
    return await profileRepository.findAll(params)
  }

  async getProfileById(id: string): Promise<ApiResponse<Profile>> {
    return await profileRepository.findById(id)
  }

  async updateProfile(id: string, input: UpdateProfileInput): Promise<ApiResponse<Profile>> {
    // Validation
    if (input.role && !this.isValidRole(input.role)) {
      return {
        data: null,
        error: 'Invalid role',
        message: 'Validation failed'
      }
    }

    // Business logic: Users can only update their own profile or admins can update any
    // This should be checked in the controller/middleware layer

    return await profileRepository.update(id, input)
  }

  async deleteProfile(id: string): Promise<ApiResponse<Profile>> {
    // Business logic: Check if user has projects assigned
    // This would need additional checks

    return await profileRepository.delete(id)
  }

  async getTeamMembers(params: QueryParams = {}): Promise<any> {
    // Get all profiles except clients
    const result = await profileRepository.findAll({
      ...params,
      filters: [
        ...(params.filters || []),
        { field: 'role', operator: 'neq', value: 'client' }
      ]
    })

    return result
  }

  async getClients(params: QueryParams = {}): Promise<any> {
    // Get only client profiles
    return await profileRepository.findByRole('client', params)
  }

  async updateRole(id: string, role: UserRole): Promise<ApiResponse<Profile>> {
    if (!this.isValidRole(role)) {
      return {
        data: null,
        error: 'Invalid role',
        message: 'Validation failed'
      }
    }

    return await profileRepository.update(id, { role })
  }

  async searchProfiles(query: string, params: QueryParams = {}) {
    return await profileRepository.search(query, params)
  }

  private isValidRole(role: string): role is UserRole {
    return ['super_admin', 'admin', 'project_manager', 'designer', 'developer', 'client'].includes(role)
  }
}

export const profileService = new ProfileService()
