"use client"

import { useCmsHero, useUpdateCmsHero } from "@/hooks/api/useCms"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCallback, useState, useEffect, useRef, useTransition } from "react"
import { useToast } from "@/components/ui/toast"

function HeroForm() {
  const { items, loading, error, refetch } = useCmsHero(true)
  const { update } = useUpdateCmsHero()
  const { showToast } = useToast()
  const [isPending, startTransition] = useTransition()
  const hero = items[0]

  // Use ref to track if form has been initialized
  const initializedRef = useRef(false)

  // Local form state for edits
  const [form, setForm] = useState({
    headline: "",
    subheadline: "",
    cta_primary_label: "",
    cta_primary_href: "",
    cta_secondary_label: "",
    cta_secondary_href: "",
  })

  // Initialize form only once when hero data loads
  useEffect(() => {
    if (hero && !initializedRef.current) {
      setForm({
        headline: hero.headline || "",
        subheadline: hero.subheadline || "",
        cta_primary_label: hero.cta_primary_label || "",
        cta_primary_href: hero.cta_primary_href || "",
        cta_secondary_label: hero.cta_secondary_label || "",
        cta_secondary_href: hero.cta_secondary_href || "",
      })
      initializedRef.current = true
    }
  }, [hero])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hero) return

    startTransition(async () => {
      const result = await update(hero.id, form)
      if (result.success) {
        showToast({
          type: "success",
          title: "Hero updated successfully",
          duration: 3000,
        })
        refetch()
      } else {
        showToast({
          type: "error",
          title: "Failed to update hero",
          message: result.error || "Something went wrong",
          duration: 5000,
        })
      }
    })
  }, [form, hero, update, refetch, showToast])

  if (loading && !hero) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-400">Loading...</div>
      </div>
    )
  }

  if (!hero) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-400">No hero data found. Please create one first.</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Headline *</label>
          <Input
            value={form.headline}
            onChange={e => setForm(f => ({ ...f, headline: e.target.value }))}
            placeholder="Creative Agency for Modern Brands"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Subheadline</label>
          <textarea
            value={form.subheadline}
            onChange={e => setForm(f => ({ ...f, subheadline: e.target.value }))}
            className="w-full px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
            rows={3}
            placeholder="FASE helps brands grow through technology, creativity, and digital innovation..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Primary CTA Label</label>
            <Input
              value={form.cta_primary_label}
              onChange={e => setForm(f => ({ ...f, cta_primary_label: e.target.value }))}
              placeholder="Start Your Project"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Primary CTA Link</label>
            <Input
              value={form.cta_primary_href}
              onChange={e => setForm(f => ({ ...f, cta_primary_href: e.target.value }))}
              placeholder="/contact"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Secondary CTA Label</label>
            <Input
              value={form.cta_secondary_label}
              onChange={e => setForm(f => ({ ...f, cta_secondary_label: e.target.value }))}
              placeholder="View Our Works"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Secondary CTA Link</label>
            <Input
              value={form.cta_secondary_href}
              onChange={e => setForm(f => ({ ...f, cta_secondary_href: e.target.value }))}
              placeholder="/portfolio"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function CmsHeroPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Hero Section</h1>
        <p className="text-neutral-400 text-sm mt-1">Manage the main hero section content</p>
      </div>

      <HeroForm />
    </div>
  )
}
