"use client"

import { CmsItemManager } from "@/components/admin/cms/cms-item-manager"
import { useCmsTeam, useDeleteCmsTeamMember, useCreateCmsTeamMember, useUpdateCmsTeamMember } from "@/hooks/api/useCms"
import type { CmsTeamMember } from "@/types/cms"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

function TeamMemberForm({ item, onSuccess, onCancel }: { item: CmsTeamMember | null; onSuccess: () => void; onCancel: () => void }) {
  const { create, loading: creating } = useCreateCmsTeamMember()
  const { update, loading: updating } = useUpdateCmsTeamMember()
  const loading = creating || updating
  const [form, setForm] = useState({
    name: item?.name ?? "",
    role: item?.role ?? "",
    bio: item?.bio ?? "",
    avatar_url: item?.avatar_url ?? "",
    linkedin_url: item?.linkedin_url ?? "",
    twitter_url: item?.twitter_url ?? "",
    github_url: item?.github_url ?? "",
    is_active: item?.is_active ?? true,
    sort_order: item?.sort_order ?? 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = item ? await update(item.id, form) : await create(form)
    if (result.success) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Name *</label>
          <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Role *</label>
          <Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="CEO" required />
        </div>
      </div>
      <div>
        <label className="block text-sm text-neutral-400 mb-1">Bio</label>
        <textarea
          value={form.bio}
          onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
          className="w-full px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm text-neutral-400 mb-1">Avatar URL</label>
        <Input value={form.avatar_url} onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))} placeholder="/team/..." />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">LinkedIn</label>
          <Input value={form.linkedin_url} onChange={e => setForm(f => ({ ...f, linkedin_url: e.target.value }))} placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Twitter</label>
          <Input value={form.twitter_url} onChange={e => setForm(f => ({ ...f, twitter_url: e.target.value }))} placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">GitHub</label>
          <Input value={form.github_url} onChange={e => setForm(f => ({ ...f, github_url: e.target.value }))} placeholder="https://..." />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch checked={form.is_active} onCheckedChange={v => setForm(f => ({ ...f, is_active: v }))} />
        <span className="text-sm text-neutral-400">{form.is_active ? "Active" : "Inactive"}</span>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" disabled={loading} className="flex-1">{loading ? "Saving..." : "Save"}</Button>
      </div>
    </form>
  )
}

export default function CmsTeamPage() {
  const { items, loading, error, refetch } = useCmsTeam(true)
  const { del } = useDeleteCmsTeamMember()

  return (
    <CmsItemManager
      title="Team Members"
      items={items}
      loading={loading}
      error={error}
      onRefetch={refetch}
      onDelete={async (id) => del(id)}
      addLabel="Add Member"
      renderCard={(item, onEdit, onDel) => (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
            {item.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-white">{item.name}</p>
              <Badge variant={item.is_active ? "success" : "default"}>{item.is_active ? "Active" : "Hidden"}</Badge>
            </div>
            <p className="text-sm text-neutral-500">{item.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>✏️</Button>
            <Button variant="ghost" size="sm" onClick={() => onDel(item)} className="text-red-400 hover:text-red-300">🗑️</Button>
          </div>
        </div>
      )}
      renderForm={(item, onSuccess, onCancel) => (
        <TeamMemberForm item={item as CmsTeamMember | null} onSuccess={onSuccess} onCancel={onCancel} />
      )}
    />
  )
}
