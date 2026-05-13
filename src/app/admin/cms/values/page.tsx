"use client"

import { CmsItemManager } from "@/components/admin/cms/cms-item-manager"
import { useCmsValues, useDeleteCmsValue, useCreateCmsValue, useUpdateCmsValue } from "@/hooks/api/useCms"
import type { CmsValue } from "@/types/cms"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useToast } from "@/components/ui/toast"

function ValueForm({ item, onSuccess, onCancel }: { item: CmsValue | null; onSuccess: () => void; onCancel: () => void }) {
  const { create, loading: creating } = useCreateCmsValue()
  const { update, loading: updating } = useUpdateCmsValue()
  const { showToast } = useToast()
  const loading = creating || updating
  const [form, setForm] = useState({
    title: item?.title || "",
    description: item?.description || "",
    is_active: item?.is_active ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = item ? await update(item.id, form) : await create(form)
    if (result.success) {
      showToast({
        type: "success",
        title: item ? "Value updated successfully" : "Value created successfully",
        duration: 3000,
      })
      onSuccess()
    } else {
      showToast({
        type: "error",
        title: "Failed to save value",
        message: result.error || "Something went wrong",
        duration: 5000,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-neutral-400 mb-1">Title *</label>
        <Input
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="International Standard"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          className="w-full px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
          rows={2}
          placeholder="We apply global best practices and world-class methodologies..."
        />
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

export default function CmsValuesPage() {
  const { items, loading, error, refetch } = useCmsValues(true)
  const { del } = useDeleteCmsValue()
  const { showToast } = useToast()

  const handleDelete = async (id: string) => {
    const result = await del(id)
    if (result.success) {
      showToast({
        type: "success",
        title: "Value deleted successfully",
        duration: 3000,
      })
      refetch()
    } else {
      showToast({
        type: "error",
        title: "Failed to delete value",
        message: result.error || "Something went wrong",
        duration: 5000,
      })
    }
    return result
  }

  return (
    <CmsItemManager
      title="Values (Why Us Section)"
      items={items}
      loading={loading}
      error={error}
      onRefetch={refetch}
      onDelete={handleDelete}
      addLabel="Add Value"
      renderCard={(item, onEdit, onDel) => (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-white">{item.title}</p>
              {item.is_active && <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">Active</span>}
            </div>
            <p className="text-sm text-neutral-500 truncate">{item.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>✏️</Button>
            <Button variant="ghost" size="sm" onClick={() => onDel(item)} className="text-red-400 hover:text-red-300">🗑️</Button>
          </div>
        </div>
      )}
      renderForm={(item, onSuccess, onCancel) => (
        <ValueForm item={item as CmsValue | null} onSuccess={onSuccess} onCancel={onCancel} />
      )}
    />
  )
}
