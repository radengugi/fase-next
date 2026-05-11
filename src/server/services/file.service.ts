import { fileRepository, type CreateFileInput } from '../repositories/file.repository'
import { projectRepository } from '../repositories/project.repository'
import { clientRepository } from '../repositories/client.repository'
import type { QueryParams } from '../repositories/base.repository'

export class FileService {
  async getAllFiles(params: QueryParams = {}) {
    return await fileRepository.findAll(params)
  }

  async getFileById(id: string) {
    return await fileRepository.findById(id)
  }

  async createFile(input: CreateFileInput & { uploaderId: string }) {
    // Validation
    if (!input.name || input.name.trim().length === 0) {
      return {
        data: null,
        error: 'File name is required',
        message: 'Validation failed'
      }
    }

    if (!input.file_path || input.file_path.trim().length === 0) {
      return {
        data: null,
        error: 'File path is required',
        message: 'Validation failed'
      }
    }

    if (!input.file_size || input.file_size <= 0) {
      return {
        data: null,
        error: 'File size must be greater than 0',
        message: 'Validation failed'
      }
    }

    // Business logic: Verify project exists if provided
    if (input.project_id) {
      const project = await projectRepository.findById(input.project_id)
      if (!project.data) {
        return {
          data: null,
          error: 'Project not found',
          message: 'Validation failed'
        }
      }
    }

    // Business logic: Verify client exists if provided
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

    return await fileRepository.create({
      project_id: input.project_id || null,
      client_id: input.client_id || null,
      name: input.name,
      file_path: input.file_path,
      file_size: input.file_size,
      mime_type: input.mime_type
    })
  }

  async deleteFile(id: string) {
    // Business logic: In production, you'd also delete from storage here
    return await fileRepository.delete(id)
  }

  async getFilesByProject(projectId: string, params: QueryParams = {}) {
    return await fileRepository.getByProject(projectId, params)
  }

  async getFilesByClient(clientId: string, params: QueryParams = {}) {
    return await fileRepository.getByClient(clientId, params)
  }

  async searchFiles(query: string, params: QueryParams = {}) {
    return await fileRepository.search(query, params)
  }

  async getStorageStats() {
    // Get all files to calculate storage statistics
    const result = await fileRepository.findAll({ pagination: { page: 1, limit: 1000 } })

    const files = result.data || []
    const totalSize = files.reduce((sum, file) => sum + (file.file_size || 0), 0)
    const count = result.pagination?.total || 0

    return {
      data: {
        totalSize,
        count,
        avgSize: count > 0 ? totalSize / count : 0
      },
      error: null
    }
  }
}

export const fileService = new FileService()
