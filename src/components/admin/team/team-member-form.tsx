"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTeamMember, updateTeamMember } from "@/services/team"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { TeamMember, CreateTeamMemberInput } from "@/types/team"
import { UserRole } from "@/types/auth"

interface TeamMemberFormProps {
  member?: TeamMember | null
  onSuccess?: () => void
}

const roles: { value: UserRole; label: string }[] = [
  // { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "client", label: "Client" }
]

export function TeamMemberForm({ member, onSuccess }: TeamMemberFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data: CreateTeamMemberInput = {
      email: formData.get("email") as string,
      full_name: formData.get("full_name") as string,
      role: formData.get("role") as UserRole
    }

    const result = member
      ? await updateTeamMember({ ...data, id: member.id })
      : await createTeamMember(data)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    onSuccess?.()
    router.refresh()
  }

  const handleCancel = () => {
    onSuccess?.()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="full_name"
          label="Full Name"
          placeholder="John Doe"
          required
          defaultValue={member?.full_name ?? ""}
          disabled={isLoading}
        />

        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="john@example.com"
          required
          defaultValue={member?.email ?? ""}
          disabled={isLoading}
        />

        <Select
          name="role"
          label="Role"
          options={roles}
          required
          defaultValue={member?.role ?? ""}
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md p-3">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <Button
          type="button"
          variant="ghost"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {member ? "Update Member" : "Add Member"}
        </Button>
      </div>
    </form>
  )
}
