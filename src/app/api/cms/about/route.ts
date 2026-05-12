import { NextRequest, NextResponse } from 'next/server'
import { cmsAboutService } from '@/server/services/cms.service'

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug')
    const admin = request.nextUrl.searchParams.get('admin') === '1'

    if (slug) {
      const result = await cmsAboutService.getBySlug(slug)
      return NextResponse.json(result)
    }

    if (admin) {
      const result = await cmsAboutService.getAll()
      return NextResponse.json(result)
    }

    const result = await cmsAboutService.getActive()
    return NextResponse.json({ data: result ? [result] : [], error: null })
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await cmsAboutService.create(body)
    if (result.error) return NextResponse.json(result, { status: 400 })
    return NextResponse.json(result, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}
