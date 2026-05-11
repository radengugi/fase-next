"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Upload, File, Trash2, Download, MoreHorizontal, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/ui/empty-state"
import { FileUploadModal } from "@/components/admin/files/file-upload-modal"
import { useFiles, useDeleteFile } from "@/hooks/api/useFiles"
import { useToast } from "@/components/ui/toast"
import type { FileItem } from "@/server/repositories/file.repository"

const fileIcons: Record<string, string> = {
  "application/pdf": "📄",
  "image/jpeg": "🖼️",
  "image/png": "🖼️",
  "image/gif": "🖼️",
  "image/webp": "🖼️",
  "application/zip": "📦",
  "application/x-zip-compressed": "📦",
  "text/plain": "📝",
  "application/msword": "📝",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "📝",
  "application/vnd.ms-excel": "📊",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "📊",
  "default": "📎"
}

export default function FilesPage() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const { showToast } = useToast()
  const { files, loading, error, refetch } = useFiles()
  const { deleteFile, loading: deleting } = useDeleteFile()

  const filteredFiles = useMemo(() => {
    if (!search) return files
    const lowerSearch = search.toLowerCase()
    return files.filter(f =>
      f.name.toLowerCase().includes(lowerSearch) ||
      (f.projects?.name && f.projects.name.toLowerCase().includes(lowerSearch)) ||
      (f.clients?.company_name && f.clients.company_name.toLowerCase().includes(lowerSearch))
    )
  }, [files, search])

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  function getFileIcon(mimeType: string): string {
    return fileIcons[mimeType] || fileIcons.default
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    const result = await deleteFile(id)
    if (result.success) {
      showToast({ type: 'success', title: 'Success', message: 'File deleted successfully' })
      refetch()
    } else {
      showToast({ type: 'error', title: 'Error', message: result.error || 'Failed to delete file' })
    }
  }

  const handleDownload = (file: FileItem) => {
    // In a real implementation, this would download the file from storage
    showToast({ type: 'info', title: 'Download', message: 'File download coming soon' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Files</h1>
          <p className="text-neutral-400">Manage project files and documents.</p>
        </div>
        <Button onClick={() => setShowUploadModal(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <Input
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
          >
            {view === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400 mb-1">Total Files</p>
                <p className="text-2xl font-bold text-white">{files.length}</p>
              </div>
              <File className="w-8 h-8 text-neutral-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400 mb-1">Total Storage</p>
                <p className="text-2xl font-bold text-white">
                  {formatFileSize(files.reduce((sum, f) => sum + (f.file_size || 0), 0))}
                </p>
              </div>
              <File className="w-8 h-8 text-neutral-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400 mb-1">This Week</p>
                <p className="text-2xl font-bold text-white">
                  {files.filter(f => {
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return new Date(f.created_at) >= weekAgo
                  }).length}
                </p>
              </div>
              <File className="w-8 h-8 text-neutral-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Files Grid/List */}
      {filteredFiles.length === 0 ? (
        <EmptyState
          title="No files found"
          description={
            search
              ? "No files match your search criteria."
              : "Upload your first file to get started."
          }
          action={search ? undefined : (
            <Button onClick={() => setShowUploadModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          )}
        />
      ) : (
        <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" : "space-y-2"}>
          {filteredFiles.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={view === 'grid' ? "group" : ""}
            >
              {view === 'grid' ? (
                <Card className="group-hover:border-[#6366F1]/30 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{getFileIcon(file.mime_type)}</div>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload(file)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(file.id)}
                            className="text-red-500"
                            disabled={deleting}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <h3 className="font-medium text-white text-sm mb-1 truncate">{file.name}</h3>
                    <p className="text-xs text-neutral-500 mb-2">
                      {formatFileSize(file.file_size)}
                    </p>

                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>{file.projects?.name || file.clients?.company_name || 'General'}</span>
                      <span>{new Date(file.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors">
                  <div className="text-2xl">{getFileIcon(file.mime_type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">{file.name}</p>
                    <p className="text-xs text-neutral-500">
                      {formatFileSize(file.file_size)} • {file.projects?.name || file.clients?.company_name || 'General'}
                    </p>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {new Date(file.created_at).toLocaleDateString()}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload(file)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(file.id)}
                        className="text-red-500"
                        disabled={deleting}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={() => {
          setShowUploadModal(false)
          refetch()
        }}
      />
    </div>
  )
}
