"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FolderKanban, FileText, DollarSign, Calendar, Clock } from "lucide-react"

export default function ClientDashboardPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [projectsRes, invoicesRes] = await Promise.all([
        fetch("/api/client/projects"),
        fetch("/api/client/invoices")
      ])

      const projectsData = await projectsRes.json()
      const invoicesData = await invoicesRes.json()

      setProjects(projectsData.data || [])
      setInvoices(invoicesData.data || [])
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const activeProjects = projects.filter((p: any) => !["Completed", "Cancelled"].includes(p.status))
  const pendingInvoices = invoices.filter((i: any) => i.status === "Pending" || i.status === "Overdue")

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-neutral-400 mt-2">Here's an overview of your projects and invoices.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FolderKanban className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Active Projects</p>
                  <p className="text-2xl font-bold text-white">{activeProjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <FileText className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Pending Invoices</p>
                  <p className="text-2xl font-bold text-white">{pendingInvoices.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Outstanding</p>
                  <p className="text-2xl font-bold text-white">
                    ${pendingInvoices.reduce((sum: number, i: any) => sum + Number(i.amount), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Active Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.length === 0 ? (
                <p className="text-neutral-500 text-center py-8">No active projects</p>
              ) : (
                activeProjects.slice(0, 5).map((project: any) => (
                  <div key={project.id} className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-white">{project.name}</h3>
                        <p className="text-sm text-neutral-500">{project.service_type}</p>
                      </div>
                      <Badge variant="primary" size="sm">{project.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Progress</span>
                        <span className="text-white">{
                          project.status === "Planning" ? "10" :
                          project.status === "Design" ? "25" :
                          project.status === "Development" ? "50" :
                          project.status === "Revision" ? "75" :
                          project.status === "Testing" ? "90" : "100"
                        }%</span>
                      </div>
                      <Progress
                        value={
                          project.status === "Planning" ? 10 :
                          project.status === "Design" ? 25 :
                          project.status === "Development" ? 50 :
                          project.status === "Revision" ? 75 :
                          project.status === "Testing" ? 90 : 100
                        }
                      />
                    </div>
                    {project.deadline && (
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-3">
                        <Calendar className="w-3 h-3" />
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Invoices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.slice(0, 5).map((invoice: any) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-800">
                      <FileText className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{invoice.invoice_number}</p>
                      <p className="text-xs text-neutral-500">
                        Due: {new Date(invoice.due_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">
                      ${Number(invoice.amount).toLocaleString()}
                    </p>
                    <Badge
                      variant={invoice.status === "Paid" ? "success" : invoice.status === "Overdue" ? "danger" : "warning"}
                      size="sm"
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
