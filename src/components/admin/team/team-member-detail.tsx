"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Mail, Calendar, Building2, Edit } from "lucide-react"
import type { TeamMember } from "@/types/team"

interface TeamMemberDetailProps {
  member: TeamMember
  onEdit: () => void
}

const roleColors: Record<string, "primary" | "success" | "warning" | "danger" | "info"> = {
  super_admin: "danger",
  admin: "warning",
  project_manager: "info",
  developer: "primary",
  designer: "success",
  client: "default"
}

export function TeamMemberDetail({ member, onEdit }: TeamMemberDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar
            src={member.avatar_url || undefined}
            fallback={member.full_name || "U"}
            size="lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{member.full_name}</h2>
            <p className="text-neutral-400">{member.email}</p>
          </div>
        </div>
        <Badge variant={roleColors[member.role] || "default"}>
          {member.role.replace("_", " ")}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <Button size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Member
        </Button>
      </div>

      {/* Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <div className="p-2 rounded-lg bg-neutral-800">
              <Mail className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Email</p>
              <a
                href={`mailto:${member.email}`}
                className="text-sm text-white hover:text-neutral-300 transition-colors"
              >
                {member.email}
              </a>
            </div>
          </div>

          {member.department && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
              <div className="p-2 rounded-lg bg-neutral-800">
                <Building2 className="w-5 h-5 text-neutral-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Department</p>
                <p className="text-sm text-white">{member.department}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <div className="p-2 rounded-lg bg-neutral-800">
              <Calendar className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Joined</p>
              <p className="text-sm text-white">
                {new Date(member.joined_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <div className="p-2 rounded-lg bg-neutral-800">
              <Calendar className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Assigned Projects</p>
              <p className="text-sm text-white">
                {(member as any).assigned_projects?.[0]?.count || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      {member.skills && member.skills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill, index) => (
              <Badge key={index} variant="default">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
