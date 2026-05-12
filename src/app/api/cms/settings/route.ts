import { NextRequest, NextResponse } from 'next/server'
import { globalSettingsService } from '@/server/services/cms.service'

export async function GET() {
  try {
    const result = await globalSettingsService.getAll()
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    // Accepts { key: string, value: string } or { settings: Record<string, string> }
    if (body.settings) {
      const result = await globalSettingsService.upsertMany(body.settings)
      if (result.error) return NextResponse.json(result, { status: 400 })
      return NextResponse.json(result)
    }
    if (body.key) {
      const result = await globalSettingsService.upsert(body.key, body.value)
      if (result.error) return NextResponse.json(result, { status: 400 })
      return NextResponse.json(result)
    }
    return NextResponse.json({ data: null, error: 'Invalid request body' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}
