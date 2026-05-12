import { NextRequest, NextResponse } from 'next/server'
import { cmsTeamService } from '@/server/services/cms.service'

export async function GET(request: NextRequest) {
  try {
    const admin = request.nextUrl.searchParams.get('admin') === '1'
    const result = admin ? await cmsTeamService.getAll() : await cmsTeamService.getActive()
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await cmsTeamService.create(body)
    if (result.error) return NextResponse.json(result, { status: 400 })
    return NextResponse.json(result, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}
