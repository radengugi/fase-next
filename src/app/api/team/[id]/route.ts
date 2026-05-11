import { NextRequest, NextResponse } from 'next/server'
import { profileService } from '@/server/services/profile.service'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Handle role update separately
    if (body.role !== undefined) {
      const result = await profileService.updateRole(params.id, body.role)
      return NextResponse.json(result)
    }

    const result = await profileService.updateProfile(params.id, body)

    if (result.error && !result.data) {
      return NextResponse.json(result, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await profileService.deleteProfile(params.id)

    if (result.error && !result.data) {
      return NextResponse.json(result, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
