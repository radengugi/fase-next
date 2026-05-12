"use client"

import { CmsItemManager } from "@/components/admin/cms/cms-item-manager"
import { useCmsServices, useDeleteCmsService, useCreateCmsService, useUpdateCmsService } from "@/hooks/api/useCms"
import type { CmsService } from "@/types/cms"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState, useTransition } from "react"
import { useToast } from "@/components/ui/toast"

function ServiceForm({ item, onSuccess, onCancel }: { item: CmsService | null; onSuccess: () => void; onCancel: () => void }) {
  const { create, loading: creating } = useCreateCmsService()
  const { update, loading: updating } = useUpdateCmsService()
  const { showToast } = useToast()
  const [isPending, startTransition] = useTransition()
  const loading = creating || updating || isPending
  const { items: allServices } = useCmsServices(true)
  const [form, setForm] = useState({
    slug: item?.slug ?? "",
    icon: item?.icon ?? "◈",
    title: item?.title ?? "",
    description: item?.description ?? "",
    color: item?.color ?? "#B9fA3C",
    is_active: item?.is_active ?? true,
    sort_order: item?.sort_order ?? 0,
  })

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (value: string) => {
    setForm(f => ({ ...f, title: value }))
    // Auto-generate slug if creating new item
    if (!item && !form.slug) {
      setForm(f => ({ ...f, slug: generateSlug(value) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if slug already exists (excluding current item)
    const slugExists = allServices.some(s => s.slug === form.slug && s.id !== item?.id)
    if (slugExists) {
      showToast({
        type: "error",
        title: "Slug already exists",
        message: "Please use a unique slug for this service",
        duration: 5000,
      })
      return
    }

    startTransition(async () => {
      const result = item ? await update(item.id, form) : await create(form)
      if (result.success) {
        showToast({
          type: "success",
          title: item ? "Service updated successfully" : "Service created successfully",
          duration: 3000,
        })
        onSuccess()
      } else {
        showToast({
          type: "error",
          title: "Failed to save service",
          message: result.error || "Something went wrong",
          duration: 5000,
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Title *</label>
          <Input
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Branding Strategy"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Slug *</label>
          <Input
            value={form.slug}
            onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
            placeholder="branding-strategy"
            required
          />
          <p className="text-xs text-neutral-500 mt-1">Used in URL: /services/{form.slug || 'slug'}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Icon</label>
          <Input
            value={form.icon}
            onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
            placeholder="◈"
          />
          <p className="text-xs text-neutral-500 mt-1">Emoji: ◈ ◎ ⬡ ◉ ◐ ◑ ◒ ◓ ◔ ◕</p>
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={form.color}
              onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
              className="w-10 h-10 rounded border-0 bg-transparent cursor-pointer"
            />
            <Input
              value={form.color}
              onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          className="w-full px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
          rows={3}
          placeholder="Service description..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Switch checked={form.is_active} onCheckedChange={v => setForm(f => ({ ...f, is_active: v }))} />
          <span className="text-sm text-neutral-400">{form.is_active ? "Active" : "Inactive"}</span>
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Sort Order</label>
          <Input
            type="number"
            value={form.sort_order}
            onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" disabled={loading} className="flex-1">{loading ? "Saving..." : "Save"}</Button>
      </div>
    </form>
  )
}

export default function CmsServicesPage() {
  const { items, loading, error, refetch } = useCmsServices(true)
  const { del } = useDeleteCmsService()
  const { showToast } = useToast()

  const handleDelete = async (id: string) => {
    return await del(id)
  }

  return (
    <CmsItemManager
      title="Services"
      items={items}
      loading={loading}
      error={error}
      onRefetch={refetch}
      onDelete={handleDelete}
      addLabel="Add Service"
      renderCard={(item, onEdit, onDel) => (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
            style={{ background: (item.color ?? '#B9fA3C') + '20', color: item.color ?? '#B9fA3C' }}
          >
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-white">{item.title}</p>
              <Badge variant={item.is_active ? "success" : "default"}>
                {item.is_active ? "Active" : "Hidden"}
              </Badge>
            </div>
            <p className="text-sm text-neutral-500 truncate">{item.description}</p>
            <p className="text-xs text-neutral-600">/{item.slug}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}><span className="sr-only">Edit</span>✏️</Button>
            <Button variant="ghost" size="sm" onClick={() => onDel(item)} className="text-red-400 hover:text-red-300"><span className="sr-only">Delete</span>🗑️</Button>
          </div>
        </div>
      )}
      renderForm={(item, onSuccess, onCancel) => (
        <ServiceForm item={item as CmsService | null} onSuccess={onSuccess} onCancel={onCancel} />
      )}
    />
  )
}
