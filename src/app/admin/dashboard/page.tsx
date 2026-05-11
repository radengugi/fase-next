"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FolderKanban,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { useDashboardStats } from "@/hooks/api/useDashboard"

export default function AdminDashboardPage() {
  const { stats, loading, error } = useDashboardStats()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error}
      </div>
    )
  }

  const dashboardStats = stats ? [
    {
      label: "Total Clients",
      value: stats.clients.total.toString(),
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      color: "text-blue-500"
    },
    {
      label: "Active Projects",
      value: stats.projects.inProgress.toString(),
      change: `+${stats.projects.inProgress}`,
      trend: "up" as const,
      icon: FolderKanban,
      color: "text-emerald-500"
    },
    {
      label: "Completed Projects",
      value: stats.projects.completed.toString(),
      change: `+${stats.projects.completed}`,
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-purple-500"
    },
    {
      label: "Total Projects",
      value: stats.projects.total.toString(),
      change: "All time",
      trend: "up" as const,
      icon: FolderKanban,
      color: "text-amber-500"
    }
  ] : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-neutral-400">Welcome back. Here's an overview of your agency.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="hover:border-neutral-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-neutral-900 ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-neutral-800 rounded-lg bg-neutral-900/50">
                <div className="text-center">
                  <p className="text-neutral-500 mb-2">Chart Placeholder</p>
                  <p className="text-xs text-neutral-600">Recharts integration coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              {stats && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50">
                    <div>
                      <p className="text-sm text-neutral-400">Total Revenue</p>
                      <p className="text-lg font-bold text-white">${stats.revenue.total.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50">
                    <div>
                      <p className="text-sm text-neutral-400">This Month</p>
                      <p className="text-lg font-bold text-white">${stats.revenue.thisMonth.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50">
                    <div>
                      <p className="text-sm text-neutral-400">Tasks Completed</p>
                      <p className="text-lg font-bold text-white">{stats.tasks.completed}</p>
                    </div>
                    <Badge variant="success">{stats.tasks.completed}/{stats.tasks.total}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
