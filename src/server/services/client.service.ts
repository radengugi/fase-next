import { clientRepository, type CreateClientInput, type UpdateClientInput } from '../repositories/client.repository'
import type { QueryParams } from '../repositories/base.repository'

export class ClientService {
  async getAllClients(params: QueryParams = {}) {
    return await clientRepository.findAll(params)
  }

  async getClientById(id: string) {
    return await clientRepository.findById(id)
  }

  async createClient(input: CreateClientInput) {
    // Validation
    if (!input.company_name || input.company_name.trim().length === 0) {
      return {
        data: null,
        error: 'Company name is required',
        message: 'Validation failed'
      }
    }

    if (!input.contact_name || input.contact_name.trim().length === 0) {
      return {
        data: null,
        error: 'Contact name is required',
        message: 'Validation failed'
      }
    }

    return await clientRepository.create(input)
  }

  async updateClient(id: string, input: UpdateClientInput) {
    // Validation
    if (input.company_name !== undefined && input.company_name.trim().length === 0) {
      return {
        data: null,
        error: 'Company name is required',
        message: 'Validation failed'
      }
    }

    if (input.contact_name !== undefined && input.contact_name.trim().length === 0) {
      return {
        data: null,
        error: 'Contact name is required',
        message: 'Validation failed'
      }
    }

    return await clientRepository.update(id, input)
  }

  async deleteClient(id: string) {
    // Business logic: Check if client has active projects
    // This would be implemented when projects are fully integrated
    return await clientRepository.delete(id)
  }

  async searchClients(query: string, params: QueryParams = {}) {
    return await clientRepository.search(query, params)
  }
}

export const clientService = new ClientService()
