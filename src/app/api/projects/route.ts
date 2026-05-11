import { NextRequest, NextResponse } from 'next/server'
import { projectService } from '@/server/services/project.service'
import type { QueryParams } from '@/server/repositories/base.repository'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Build query params
    const params: QueryParams = {
      pagination: {
        page: parseInt(searchParams.get('page') || '1'),
        limit: parseInt(searchParams.get('limit') || '10')
      },
      filters: [],
      sort: {
        field: searchParams.get('sort') || 'created_at',
        order: (searchParams.get('order') || 'desc') as 'asc' | 'desc'
      }
    }

    // Add filters from query params
    const status = searchParams.get('status')
    if (status) {
      params.filters?.push({ field: 'status', operator: 'eq', value: status })
    }

    const priority = searchParams.get('priority')
    if (priority) {
      params.filters?.push({ field: 'priority', operator: 'eq', value: priority })
    }

    const clientId = searchParams.get('client_id')
    if (clientId) {
      params.filters?.push({ field: 'client_id', operator: 'eq', value: clientId })
    }

    const search = searchParams.get('search')
    if (search) {
      params.filters?.push({ field: 'name', operator: 'ilike', value: search })
    }

    const result = await projectService.getAllProjects(params)

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = await projectService.createProject(body)

    if (result.error) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
