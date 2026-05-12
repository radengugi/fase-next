import { NextRequest, NextResponse } from 'next/server'
import { cmsPortfolioService } from '@/server/services/cms.service'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  try {
    const admin = request.nextUrl.searchParams.get('admin') === '1'
    const category = request.nextUrl.searchParams.get('category')
    let result
    if (category && !admin) {
      result = await cmsPortfolioService.getByCategory(category)
    } else if (admin) {
      result = await cmsPortfolioService.getAll()
    } else {
      result = await cmsPortfolioService.getActive()
    }
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await cmsPortfolioService.create(body)
    if (result.error) return NextResponse.json(result, { status: 400 })

    // Revalidate portfolio pages
    revalidatePath('/portfolio')
    revalidatePath('/')

    return NextResponse.json(result, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body
    delete body.id
    const result = await cmsPortfolioService.update(id, body)
    if (result.error) return NextResponse.json(result, { status: 400 })

    // Revalidate portfolio pages
    revalidatePath('/portfolio')
    revalidatePath('/')

    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    const result = await cmsPortfolioService.delete(id)
    if (result.error) return NextResponse.json(result, { status: 400 })

    // Revalidate portfolio pages
    revalidatePath('/portfolio')
    revalidatePath('/')

    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ data: null, error: e.message }, { status: 500 })
  }
}
