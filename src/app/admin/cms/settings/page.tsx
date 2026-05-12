"use client"

import { useCmsSettings } from "@/hooks/api/useCms"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import { useState, useEffect } from "react"

const SETTING_GROUPS = [
  {
    label: "Company Info",
    keys: ["company_name", "company_tagline", "company_email", "company_phone", "company_address"],
  },
  {
    label: "SEO",
    keys: ["seo_title", "seo_description", "seo_keywords", "og_image", "twitter_handle"],
  },
  {
    label: "Misc",
    keys: ["trusted_brands"],
  },
]

const KEY_LABELS: Record<string, string> = {
  company_name: "Company Name",
  company_tagline: "Tagline",
  company_email: "Email",
  company_phone: "Phone",
  company_address: "Address",
  seo_title: "SEO Title",
  seo_description: "SEO Description",
  seo_keywords: "SEO Keywords",
  og_image: "OG Image URL",
  twitter_handle: "Twitter Handle",
  trusted_brands: "Trusted Brands (comma-separated)",
}

export default function CmsSettingsPage() {
  const { settingsMap, loading, refetch, save } = useCmsSettings()
  const { showToast } = useToast()
  const [form, setForm] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading) setForm(settingsMap)
  }, [loading, settingsMap])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const result = await save(form)
    setSaving(false)
    if (result.success) {
      showToast({ type: "success", title: "Saved", message: "Settings updated successfully." })
    } else {
      showToast({ type: "error", title: "Error", message: result.error || "Failed to save settings." })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-[#B9fA3C] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Settings</h1>
          <p className="text-neutral-400 mt-1">Company info, SEO defaults, and global configuration.</p>
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save All Settings"}
        </Button>
      </div>

      {SETTING_GROUPS.map((group) => (
        <div key={group.label} className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">{group.label}</h2>
          {group.keys.map((key) => (
            <div key={key}>
              <label className="block text-sm text-neutral-300 mb-1.5">{KEY_LABELS[key] || key}</label>
              {key === "seo_description" || key === "trusted_brands" ? (
                <textarea
                  value={form[key] ?? ""}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-neutral-800/50 border border-neutral-700 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                  rows={3}
                />
              ) : (
                <Input
                  value={form[key] ?? ""}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="bg-neutral-800/50 border-neutral-700"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </form>
  )
}
