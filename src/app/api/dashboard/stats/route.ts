import { NextResponse } from 'next/server'
import { projectService } from '@/server/services/project.service'
import { clientService } from '@/server/services/client.service'

export async function GET() {
  try {
    const [projectsResult, clientsResult] = await Promise.all([
      projectService.getDashboardStats(),
      clientService.getAllClients({ pagination: { page: 1, limit: 1 } })
    ])

    const stats = {
      projects: {
        total: projectsResult.data?.total || 0,
        inProgress: projectsResult.data?.inProgress || 0,
        completed: projectsResult.data?.completed || 0
      },
      clients: {
        total: clientsResult.pagination?.total || 0
      },
      // Add more stats as needed
      revenue: {
        total: 0,
        thisMonth: 0
      },
      tasks: {
        total: 0,
        completed: 0,
        pending: 0
      }
    }

    return NextResponse.json({
      data: stats,
      error: null
    })
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message, message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
