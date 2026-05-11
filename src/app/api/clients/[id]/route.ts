import { NextRequest, NextResponse } from 'next/server'
import { clientService } from '@/server/services/client.service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await clientService.getClientById(id)

    if (result.error) {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const result = await clientService.updateClient(id, body)

    if (result.error) {
      return NextResponse.json(result, { status: 400 })
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await clientService.deleteClient(id)

    if (result.error) {
      return NextResponse.json(result, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('[DELETE /api/clients/[id]] Error:', error)
    return NextResponse.json(
      { data: null, error: error.message, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
