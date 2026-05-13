"use client"

import { CmsItemManager } from "@/components/admin/cms/cms-item-manager"
import { useCmsPortfolio, useDeleteCmsPortfolio, useCreateCmsPortfolio, useUpdateCmsPortfolio } from "@/hooks/api/useCms"
import type { CmsPortfolio } from "@/types/cms"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/image-upload"
import Image from "next/image"
import { useState } from "react"
import { useToast } from "@/components/ui/toast"

function PortfolioForm({ item, onSuccess, onCancel }: { item: CmsPortfolio | null; onSuccess: () => void; onCancel: () => void }) {
  const { create, loading: creating } = useCreateCmsPortfolio()
  const { update, loading: updating } = useUpdateCmsPortfolio()
  const { showToast } = useToast()
  const loading = creating || updating
  const [form, setForm] = useState({
    title: item?.title ?? "",
    category: item?.category ?? "",
    description: item?.description ?? "",
    tags: item?.tags?.join(", ") ?? "",
    image_url: item?.image_url ?? "",
    year: item?.year ?? new Date().getFullYear().toString(),
    client_name: item?.client_name ?? "",
    is_active: item?.is_active ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) }
    const result = item ? await update(item.id, data) : await create(data)
    if (result.success) {
      showToast({
        type: "success",
        title: item ? "Project updated successfully" : "Project created successfully",
        duration: 3000,
      })
      onSuccess()
    } else {
      showToast({
        type: "error",
        title: "Failed to save project",
        message: result.error || "Something went wrong",
        duration: 5000,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-neutral-400 mb-1">Project Image *</label>
        <ImageUpload
          value={form.image_url}
          onChange={(url) => setForm(f => ({ ...f, image_url: url }))}
          onRemove={() => setForm(f => ({ ...f, image_url: "" }))}
        />
        <p className="text-xs text-neutral-500 mt-1.5">Ukuran ideal: <span className="text-neutral-400">1280×720px</span> (16:9) · Format: JPG, PNG, WebP · Maks. <span className="text-neutral-400">2MB</span></p>
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1">Title *</label>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Category *</label>
          <Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Web Development" required />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Year</label>
          <Input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
        </div>
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          className="w-full px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1">Client Name</label>
        <Input value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} />
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1">Tags (comma-separated)</label>
        <Input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Next.js, TypeScript, Figma" />
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

export default function CmsPortfolioPage() {
  const { items, loading, error, refetch } = useCmsPortfolio(true)
  const { del } = useDeleteCmsPortfolio()

  const handleDelete = async (id: string) => {
    return await del(id)
  }

  return (
    <CmsItemManager
      title="Portfolio"
      items={items}
      loading={loading}
      error={error}
      onRefetch={refetch}
      onDelete={handleDelete}
      addLabel="Add Project"
      renderCard={(item, onEdit, onDel) => (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
          {item.image_url ? (
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-800 relative">
              <Image src={item.image_url} alt={item.title} fill sizes="64px" className="object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-500 font-bold text-lg flex-shrink-0">
              {item.title.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium text-white">{item.title}</p>
              <Badge variant="info">{item.category}</Badge>
              <Badge variant={item.is_active ? "success" : "default"}>{item.is_active ? "Active" : "Hidden"}</Badge>
            </div>
            <p className="text-sm text-neutral-500">{item.client_name} · {item.year}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {item.tags?.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>✏️</Button>
            <Button variant="ghost" size="sm" onClick={() => onDel(item)} className="text-red-400 hover:text-red-300">🗑️</Button>
          </div>
        </div>
      )}
      renderForm={(item, onSuccess, onCancel) => (
        <PortfolioForm item={item as CmsPortfolio | null} onSuccess={onSuccess} onCancel={onCancel} />
      )}
    />
  )
}
