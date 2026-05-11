import { NextRequest, NextResponse } from 'next/server'
import { invoiceService } from '@/server/services/invoice.service'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await invoiceService.getInvoiceById(params.id)

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const result = await invoiceService.updateInvoice(params.id, body)

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
    const result = await invoiceService.deleteInvoice(params.id)

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Handle specific actions like marking as paid
    if (body.action === 'mark_as_paid') {
      const result = await invoiceService.markAsPaid(params.id)
      return NextResponse.json(result)
    }

    return NextResponse.json(
      { data: null, error: 'Invalid action', message: 'Invalid action' },
      { status: 400 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
