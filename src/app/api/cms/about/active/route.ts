import { NextRequest, NextResponse } from 'next/server'
import { cmsAboutService } from '@/server/services/cms.service'

export async function GET(request: NextRequest) {
  try {
    const result = await cmsAboutService.getActive()
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}
