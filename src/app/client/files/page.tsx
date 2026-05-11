"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Download, File } from "lucide-react"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/ui/empty-state"

const fileIcons: Record<string, string> = {
  "application/pdf": "📄",
  "image/jpeg": "🖼️",
  "image/png": "🖼️",
  "application/zip": "📦",
  "text/plain": "📝",
  "default": "📎"
}

export default function ClientFilesPage() {
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchFiles()
  }, [])

  async function fetchFiles() {
    try {
      const response = await fetch("/api/client/files")
      const { data } = await response.json()
      setFiles(data || [])
    } catch (error) {
      console.error("Failed to fetch files:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredFiles = files.filter((f: any) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  )

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Files</h1>
        <p className="text-neutral-400 mt-2">Access your project files and documents.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <Input
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredFiles.length === 0 ? (
        <EmptyState type="files" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles.map((file: any) => (
            <Card key={file.id} variant="glass" className="overflow-hidden hover:border-neutral-700 transition-colors">
              <CardContent className="p-4">
                <div className="aspect-square rounded-lg bg-neutral-900 flex items-center justify-center text-4xl mb-3">
                  {fileIcons[file.mime_type] || fileIcons.default}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <p className="text-xs text-neutral-500">{formatFileSize(file.size_bytes)}</p>
                </div>
                <button className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
