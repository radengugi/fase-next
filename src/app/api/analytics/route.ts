import { NextResponse } from 'next/server'
import { projectService } from '@/server/services/project.service'
import { clientService } from '@/server/services/client.service'
import { invoiceService } from '@/server/services/invoice.service'
import { fileService } from '@/server/services/file.service'
import { profileService } from '@/server/services/profile.service'

export async function GET() {
  try {
    // Get all statistics in parallel for better performance
    const [
      projectsResult,
      clientsResult,
      invoicesResult,
      filesResult,
      teamResult
    ] = await Promise.all([
      projectService.getDashboardStats(),
      clientService.getAllClients({ pagination: { page: 1, limit: 1 } }),
      invoiceService.getDashboardStats(),
      fileService.getStorageStats(),
      profileService.getTeamMembers({ pagination: { page: 1, limit: 100 } })
    ])

    // Calculate analytics
    const totalProjects = projectsResult.data?.total || 0
    const inProgressProjects = projectsResult.data?.inProgress || 0
    const completedProjects = projectsResult.data?.completed || 0
    const completionRate = totalProjects > 0
      ? Math.round((completedProjects / totalProjects) * 100)
      : 0

    const totalClients = clientsResult.pagination?.total || 0
    const newClientsThisMonth = totalClients // This would need date filtering in a real implementation

    const totalRevenue = invoicesResult.data?.total || 0
    const pendingRevenue = invoicesResult.data?.pending || 0

    const storageStats = filesResult.data || { totalSize: 0, count: 0 }

    const teamMembers = teamResult.data?.length || 0

    // Calculate growth (placeholder - would need historical data)
    const revenueGrowth = "+23.5" // This would be calculated from historical data
    const clientGrowth = "+12" // This would be calculated from historical data
    const projectGrowth = "+5" // This would be calculated from historical data

    const analytics = {
      kpis: [
        {
          label: "Total Revenue",
          value: `$${totalRevenue.toLocaleString()}`,
          change: revenueGrowth,
          trend: totalRevenue > 0 ? "up" : "down",
          icon: "DollarSign",
          color: "text-emerald-500"
        },
        {
          label: "New Clients",
          value: newClientsThisMonth.toString(),
          change: clientGrowth,
          trend: "up",
          icon: "Users",
          color: "text-blue-500"
        },
        {
          label: "Active Projects",
          value: inProgressProjects.toString(),
          change: projectGrowth,
          trend: "up",
          icon: "FolderKanban",
          color: "text-purple-500"
        },
        {
          label: "Completion Rate",
          value: `${completionRate}%`,
          change: completionRate >= 85 ? "+3%" : "-3%",
          trend: completionRate >= 85 ? "up" : "down",
          icon: "Target",
          color: completionRate >= 85 ? "text-emerald-500" : "text-amber-500"
        }
      ],
      projects: {
        total: totalProjects,
        inProgress: inProgressProjects,
        completed: completedProjects,
        byStatus: {
          planning: 0,
          inProgress: inProgressProjects,
          review: 0,
          completed: completedProjects,
          cancelled: 0
        }
      },
      clients: {
        total: totalClients,
        newThisMonth: newClientsThisMonth,
        byIndustry: {}, // This would need aggregation
        bySize: {} // This would need aggregation
      },
      revenue: {
        total: totalRevenue,
        pending: pendingRevenue,
        paid: totalRevenue - pendingRevenue,
        byMonth: {}, // This would need historical data aggregation
        byClient: {} // This would need aggregation
      },
      team: {
        total: teamMembers,
        byRole: {}, // This would need aggregation
        performance: [] // This would need performance metrics
      },
      storage: {
        totalSize: storageStats.totalSize,
        totalFiles: storageStats.count,
        avgSize: storageStats.avgSize
      }
    }

    return NextResponse.json({
      data: analytics,
      error: null
    })
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message, message: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
