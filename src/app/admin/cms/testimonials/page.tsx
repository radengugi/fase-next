"use client"

import { CmsItemManager } from "@/components/admin/cms/cms-item-manager"
import { useCmsTestimonials, useDeleteCmsTestimonial, useCreateCmsTestimonial, useUpdateCmsTestimonial } from "@/hooks/api/useCms"
import type { CmsTestimonial } from "@/types/cms"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

function TestimonialForm({ item, onSuccess, onCancel }: { item: CmsTestimonial | null; onSuccess: () => void; onCancel: () => void }) {
  const { create, loading: creating } = useCreateCmsTestimonial()
  const { update, loading: updating } = useUpdateCmsTestimonial()
  const loading = creating || updating
  const [form, setForm] = useState({
    name: item?.name ?? "",
    role: item?.role ?? "",
    company: item?.company ?? "",
    quote: item?.quote ?? "",
    avatar_url: item?.avatar_url ?? "",
    rating: item?.rating ?? 5,
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
          <label className="block text-sm text-neutral-400 mb-1">Rating (1-5)</label>
          <Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) || 5 }))} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Role</label>
          <Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="CEO" />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Company</label>
          <Input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
        </div>
      </div>
      <div>
        <label className="block text-sm text-neutral-400 mb-1">Quote *</label>
        <textarea
          value={form.quote}
          onChange={e => setForm(f => ({ ...f, quote: e.target.value }))}
          className="w-full px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-neutral-400 mb-1">Avatar URL</label>
        <Input value={form.avatar_url} onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))} placeholder="/testimonials/..." />
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

export default function CmsTestimonialsPage() {
  const { items, loading, error, refetch } = useCmsTestimonials(true)
  const { del } = useDeleteCmsTestimonial()

  return (
    <CmsItemManager
      title="Testimonials"
      items={items}
      loading={loading}
      error={error}
      onRefetch={refetch}
      onDelete={async (id) => del(id)}
      addLabel="Add Testimonial"
      renderCard={(item, onEdit, onDel) => (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
            {item.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-white">{item.name}</p>
              <span className="text-yellow-400 text-xs">{"★".repeat(item.rating)}</span>
              <Badge variant={item.is_active ? "success" : "default"}>{item.is_active ? "Active" : "Hidden"}</Badge>
            </div>
            <p className="text-sm text-neutral-500">{item.role} · {item.company}</p>
            <p className="text-sm text-neutral-400 mt-1 line-clamp-2">{item.quote}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>✏️</Button>
            <Button variant="ghost" size="sm" onClick={() => onDel(item)} className="text-red-400 hover:text-red-300">🗑️</Button>
          </div>
        </div>
      )}
      renderForm={(item, onSuccess, onCancel) => (
        <TestimonialForm item={item as CmsTestimonial | null} onSuccess={onSuccess} onCancel={onCancel} />
      )}
    />
  )
}
