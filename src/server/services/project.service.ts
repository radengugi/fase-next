import { projectRepository, type CreateProjectInput, type UpdateProjectInput } from '../repositories/project.repository'
import { clientRepository } from '../repositories/client.repository'
import type { QueryParams } from '../repositories/base.repository'

export class ProjectService {
  async getAllProjects(params: QueryParams = {}) {
    return await projectRepository.findAll(params)
  }

  async getProjectById(id: string) {
    return await projectRepository.findById(id)
  }

  async createProject(input: CreateProjectInput) {
    // Validation
    if (!input.name || input.name.trim().length === 0) {
      return {
        data: null,
        error: 'Project name is required',
        message: 'Validation failed'
      }
    }

    if (!input.client_id) {
      return {
        data: null,
        error: 'Client is required',
        message: 'Validation failed'
      }
    }

    // Business logic: Verify client exists
    const client = await clientRepository.findById(input.client_id)
    if (!client.data) {
      return {
        data: null,
        error: 'Client not found',
        message: 'Validation failed'
      }
    }

    // Business logic: Validate dates
    if (input.start_date && input.end_date) {
      const startDate = new Date(input.start_date)
      const endDate = new Date(input.end_date)
      if (endDate < startDate) {
        return {
          data: null,
          error: 'End date cannot be before start date',
          message: 'Validation failed'
        }
      }
    }

    return await projectRepository.create(input)
  }

  async updateProject(id: string, input: UpdateProjectInput) {
    // Business logic: Validate dates
    if (input.start_date && input.end_date) {
      const startDate = new Date(input.start_date)
      const endDate = new Date(input.end_date)
      if (endDate < startDate) {
        return {
          data: null,
          error: 'End date cannot be before start date',
          message: 'Validation failed'
        }
      }
    }

    // Business logic: If changing client, verify new client exists
    if (input.client_id) {
      const client = await clientRepository.findById(input.client_id)
      if (!client.data) {
        return {
          data: null,
          error: 'Client not found',
          message: 'Validation failed'
        }
      }
    }

    return await projectRepository.update(id, input)
  }

  async deleteProject(id: string) {
    return await projectRepository.delete(id)
  }

  async getProjectsByClient(clientId: string, params: QueryParams = {}) {
    return await projectRepository.findByClient(clientId, params)
  }

  async getDashboardStats() {
    return await projectRepository.getDashboardStats()
  }
}

export const projectService = new ProjectService()
