"use client"

import { CmsItemManager } from "@/components/admin/cms/cms-item-manager"
import { useCmsFaqs, useDeleteCmsFaq, useCreateCmsFaq, useUpdateCmsFaq } from "@/hooks/api/useCms"
import type { CmsFaq } from "@/types/cms"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

function FaqForm({ item, onSuccess, onCancel }: { item: CmsFaq | null; onSuccess: () => void; onCancel: () => void }) {
  const { create, loading: creating } = useCreateCmsFaq()
  const { update, loading: updating } = useUpdateCmsFaq()
  const loading = creating || updating
  const [form, setForm] = useState({
    question: item?.question ?? "",
    answer: item?.answer ?? "",
    category: item?.category ?? "General",
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
      <div>
        <label className="block text-sm text-neutral-400 mb-1">Question *</label>
        <Input value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} required />
      </div>
      <div>
        <label className="block text-sm text-neutral-400 mb-1">Answer *</label>
        <textarea
          value={form.answer}
          onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
          className="w-full px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-neutral-400 mb-1">Category</label>
        <Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="General" />
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

export default function CmsFaqsPage() {
  const { items, loading, error, refetch } = useCmsFaqs(true)
  const { del } = useDeleteCmsFaq()

  return (
    <CmsItemManager
      title="FAQs"
      items={items}
      loading={loading}
      error={error}
      onRefetch={refetch}
      onDelete={async (id) => del(id)}
      addLabel="Add FAQ"
      renderCard={(item, onEdit, onDel) => (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-white">{item.question}</p>
              {item.category && <Badge variant="info">{item.category}</Badge>}
              <Badge variant={item.is_active ? "success" : "default"}>{item.is_active ? "Active" : "Hidden"}</Badge>
            </div>
            <p className="text-sm text-neutral-400 mt-1 line-clamp-2">{item.answer}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>✏️</Button>
            <Button variant="ghost" size="sm" onClick={() => onDel(item)} className="text-red-400 hover:text-red-300">🗑️</Button>
          </div>
        </div>
      )}
      renderForm={(item, onSuccess, onCancel) => (
        <FaqForm item={item as CmsFaq | null} onSuccess={onSuccess} onCancel={onCancel} />
      )}
    />
  )
}
