"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenueChart } from "@/components/admin/analytics/revenue-chart"
import { ClientDistribution } from "@/components/admin/analytics/client-distribution"
import { ProjectStatusChart } from "@/components/admin/analytics/project-status-chart"
import { useAnalytics } from "@/hooks/api/useAnalytics"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  FolderKanban,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  HardDrive
} from "lucide-react"

export default function AnalyticsPage() {
  const { analytics, loading, error } = useAnalytics()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#B9fA3C] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error || 'Failed to load analytics'}
      </div>
    )
  }

  const kpis = analytics.kpis

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-neutral-400">Track your agency's performance and growth.</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon === "DollarSign" ? DollarSign :
                       kpi.icon === "Users" ? Users :
                       kpi.icon === "FolderKanban" ? FolderKanban :
                       Target
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-neutral-900 ${kpi.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {kpi.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={kpi.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">{kpi.label}</p>
                    <p className="text-2xl font-bold text-white">{kpi.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart data={analytics.revenue.byMonth} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectStatusChart data={analytics.projects.byStatus} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Client Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientDistribution data={analytics.clients.byIndustry} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Total Files</p>
                    <p className="text-2xl font-bold text-white">{analytics.storage.totalFiles}</p>
                  </div>
                  <HardDrive className="w-8 h-8 text-neutral-600" />
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B9fA3C] to-[#8B5CF6]"
                    style={{ width: '75%' }}
                  />
                </div>
                <p className="text-xs text-neutral-500">{Math.round(analytics.storage.totalSize / 1024 / 1024)} MB used</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-neutral-400">
                  Team performance metrics coming soon.
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
