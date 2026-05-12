"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import { useCmsAbout, useUpdateCmsAbout } from "@/hooks/api/useCms"
import { useEffect, useState, useTransition } from "react"

export default function CmsAboutPage() {
  const { items, loading, error, refetch } = useCmsAbout(true)
  const { update, loading: updating } = useUpdateCmsAbout()
  const { showToast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [isEditing, setIsEditing] = useState(false)

  const item = items[0] // About is a singleton

  const [form, setForm] = useState({
    slug: "about",
    hero_headline: "",
    hero_description: "",
    hero_badge: "",
    story_badge: "",
    story_title: "",
    story_content: "",
    founded_year: "",
    countries: "",
    team_members: "",
    awards: "",
  })

  // Update form when item loads
  useEffect(() => {
    if (item && !isEditing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        slug: item.slug,
        hero_headline: item.hero_headline,
        hero_description: item.hero_description ?? "",
        hero_badge: item.hero_badge ?? "",
        story_badge: item.story_badge ?? "",
        story_title: item.story_title ?? "",
        story_content: item.story_content ?? "",
        founded_year: item.founded_year ?? "",
        countries: item.countries ?? "",
        team_members: item.team_members ?? "",
        awards: item.awards ?? "",
      })
    }
  }, [item, isEditing])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!item?.id) return

    startTransition(async () => {
      const result = await update(item.id, form)
      if (result.success) {
        showToast({
          type: "success",
          title: "About page updated successfully",
          duration: 3000,
        })
        setIsEditing(false)
        refetch()
      } else {
        showToast({
          type: "error",
          title: "Failed to save",
          message: result.error || "Something went wrong",
          duration: 5000,
        })
      }
    })
  }

  const handleCancel = () => {
    if (item) {
      setForm({
        slug: item.slug,
        hero_headline: item.hero_headline,
        hero_description: item.hero_description ?? "",
        hero_badge: item.hero_badge ?? "",
        story_badge: item.story_badge ?? "",
        story_title: item.story_title ?? "",
        story_content: item.story_content ?? "",
        founded_year: item.founded_year ?? "",
        countries: item.countries ?? "",
        team_members: item.team_members ?? "",
        awards: item.awards ?? "",
      })
    }
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-400">Loading...</div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
        <p className="text-red-400">{error || "No About content found. Please create one first."}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">About Page</h1>
          <p className="text-neutral-400 mt-1">Manage hero & story content for About page</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Content</Button>
        )}
      </div>

      {!isEditing ? (
        <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Hero Badge</p>
            <p className="text-white">{item.hero_badge || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Hero Headline</p>
            <p className="text-white text-lg font-semibold">{item.hero_headline}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Hero Description</p>
            <p className="text-neutral-300">{item.hero_description || '-'}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Founded</p>
              <p className="text-white font-semibold text-xl">{item.founded_year}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Countries</p>
              <p className="text-white font-semibold text-xl">{item.countries}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Team</p>
              <p className="text-white font-semibold text-xl">{item.team_members}</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Slug</label>
              <Input
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                disabled
                className="bg-neutral-800/50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-neutral-400 mb-1">Hero Badge</label>
              <Input
                value={form.hero_badge || ''}
                onChange={e => setForm(f => ({ ...f, hero_badge: e.target.value }))}
                placeholder="About FASE"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">Hero Headline *</label>
            <Input
              value={form.hero_headline || ''}
              onChange={e => setForm(f => ({ ...f, hero_headline: e.target.value }))}
              placeholder="We Are Builders of Digital Futures"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">Hero Description</label>
            <textarea
              value={form.hero_description || ''}
              onChange={e => setForm(f => ({ ...f, hero_description: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
              rows={3}
              placeholder="FASE was born from a simple belief..."
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h3 className="text-sm font-semibold text-white">Story Section</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Story Badge</label>
                <Input
                  value={form.story_badge || ''}
                  onChange={e => setForm(f => ({ ...f, story_badge: e.target.value }))}
                  placeholder="Our Story"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Story Title</label>
                <Input
                  value={form.story_title || ''}
                  onChange={e => setForm(f => ({ ...f, story_title: e.target.value }))}
                  placeholder="Built on Craft, Driven by Purpose"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Story Content</label>
              <textarea
                value={form.story_content || ''}
                onChange={e => setForm(f => ({ ...f, story_content: e.target.value }))}
                className="w-full px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                rows={6}
                placeholder="FASE was founded with a clear mission..."
              />
              <p className="text-xs text-neutral-500 mt-1">Paragraphs will be automatically separated</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h3 className="text-sm font-semibold text-white">Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Founded Year</label>
                <Input
                  value={form.founded_year || ''}
                  onChange={e => setForm(f => ({ ...f, founded_year: e.target.value }))}
                  placeholder="2019"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Countries</label>
                <Input
                  value={form.countries || ''}
                  onChange={e => setForm(f => ({ ...f, countries: e.target.value }))}
                  placeholder="20+"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Team Members</label>
                <Input
                  value={form.team_members || ''}
                  onChange={e => setForm(f => ({ ...f, team_members: e.target.value }))}
                  placeholder="40+"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Awards</label>
                <Input
                  value={form.awards || ''}
                  onChange={e => setForm(f => ({ ...f, awards: e.target.value }))}
                  placeholder="18"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleCancel} className="flex-1">Cancel</Button>
            <Button type="submit" disabled={updating || isPending} className="flex-1">{updating || isPending ? "Saving..." : "Save Changes"}</Button>
          </div>
        </form>
      )}
    </div>
  )
}
