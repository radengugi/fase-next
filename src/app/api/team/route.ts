import { NextRequest, NextResponse } from 'next/server'
import { profileService } from '@/server/services/profile.service'
import type { QueryParams } from '@/server/repositories/base.repository'
import type { UserRole } from '@/types/database.types'

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
    const role = searchParams.get('role')
    if (role) {
      params.filters?.push({ field: 'role', operator: 'eq', value: role })
    }

    const search = searchParams.get('search')
    if (search) {
      return NextResponse.json(await profileService.searchProfiles(search, params))
    }

    // Check if this is for team members (not clients)
    const teamOnly = searchParams.get('team_only') === 'true'
    if (teamOnly) {
      return NextResponse.json(await profileService.getTeamMembers(params))
    }

    const result = await profileService.getAllProfiles(params)

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
