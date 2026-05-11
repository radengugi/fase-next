import { NextRequest, NextResponse } from 'next/server'
import { fileService } from '@/server/services/file.service'
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
    const projectId = searchParams.get('project_id')
    if (projectId) {
      params.filters?.push({ field: 'project_id', operator: 'eq', value: projectId })
    }

    const clientId = searchParams.get('client_id')
    if (clientId) {
      params.filters?.push({ field: 'client_id', operator: 'eq', value: clientId })
    }

    const search = searchParams.get('search')
    if (search) {
      return NextResponse.json(await fileService.searchFiles(search, params))
    }

    const result = await fileService.getAllFiles(params)

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

    const result = await fileService.createFile(body)

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
