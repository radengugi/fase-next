'use client'

import { TeamDirectory } from "@/components/admin/team/team-directory"
import { useTeam } from "@/hooks/api/useTeam"

export default function TeamPage() {
  const { team, loading, error } = useTeam()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#B9fA3C] border-t-transparent rounded-full animate-spin" />
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <p className="text-neutral-400">Manage your team members and permissions.</p>
      </div>

      <TeamDirectory initialData={team || []} />
    </div>
  )
}
