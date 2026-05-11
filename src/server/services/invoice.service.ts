import { invoiceRepository, type CreateInvoiceInput, type UpdateInvoiceInput } from '../repositories/invoice.repository'
import { clientRepository } from '../repositories/client.repository'
import { projectRepository } from '../repositories/project.repository'
import type { QueryParams } from '../repositories/base.repository'

export class InvoiceService {
  async getAllInvoices(params: QueryParams = {}) {
    return await invoiceRepository.findAll(params)
  }

  async getInvoiceById(id: string) {
    return await invoiceRepository.findById(id)
  }

  async createInvoice(input: CreateInvoiceInput) {
    // Validation
    if (!input.invoice_number || input.invoice_number.trim().length === 0) {
      return {
        data: null,
        error: 'Invoice number is required',
        message: 'Validation failed'
      }
    }

    if (!input.amount || input.amount <= 0) {
      return {
        data: null,
        error: 'Amount must be greater than 0',
        message: 'Validation failed'
      }
    }

    if (!input.issue_date) {
      return {
        data: null,
        error: 'Issue date is required',
        message: 'Validation failed'
      }
    }

    if (!input.due_date) {
      return {
        data: null,
        error: 'Due date is required',
        message: 'Validation failed'
      }
    }

    // Business logic: Validate dates
    const issueDate = new Date(input.issue_date)
    const dueDate = new Date(input.due_date)
    if (dueDate < issueDate) {
      return {
        data: null,
        error: 'Due date cannot be before issue date',
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

      // Business logic: Verify project belongs to client
      if (project.data.client_id !== input.client_id) {
        return {
          data: null,
          error: 'Project does not belong to this client',
          message: 'Validation failed'
        }
      }
    }

    return await invoiceRepository.create(input)
  }

  async updateInvoice(id: string, input: UpdateInvoiceInput) {
    // Business logic: Validate dates if provided
    if (input.issue_date && input.due_date) {
      const issueDate = new Date(input.issue_date)
      const dueDate = new Date(input.due_date)
      if (dueDate < issueDate) {
        return {
          data: null,
          error: 'Due date cannot be before issue date',
          message: 'Validation failed'
        }
      }
    }

    return await invoiceRepository.update(id, input)
  }

  async deleteInvoice(id: string) {
    return await invoiceRepository.delete(id)
  }

  async markAsPaid(id: string) {
    return await invoiceRepository.markAsPaid(id)
  }

  async getInvoicesByClient(clientId: string, params: QueryParams = {}) {
    return await invoiceRepository.getByClient(clientId, params)
  }

  async getOverdueInvoices(params: QueryParams = {}) {
    return await invoiceRepository.getOverdue(params)
  }

  async getDashboardStats() {
    try {
      const [invoicesResult, overdueResult] = await Promise.all([
        invoiceRepository.findAll({ pagination: { page: 1, limit: 1 } }),
        invoiceRepository.getOverdue({ pagination: { page: 1, limit: 1 } })
      ])

      const totalRevenue = invoicesResult.pagination?.total || 0
      const overdueCount = overdueResult.pagination?.total || 0

      // Get pending invoices count
      const pendingResult = await invoiceRepository.findAll({
        filters: [{ field: 'status', operator: 'eq', value: 'pending' }],
        pagination: { page: 1, limit: 1 }
      })

      return {
        data: {
          total: totalRevenue,
          pending: pendingResult.pagination?.total || 0,
          overdue: overdueCount
        },
        error: null
      }
    } catch (error: any) {
      return {
        data: {
          total: 0,
          pending: 0,
          overdue: 0
        },
        error: error.message
      }
    }
  }
}

export const invoiceService = new InvoiceService()
