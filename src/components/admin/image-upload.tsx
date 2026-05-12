"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { cn } from "@/utils/cn"
import { useToast } from "@/components/ui/toast"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  className?: string
}

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

export function ImageUpload({ value, onChange, onRemove, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | undefined>(value)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showToast } = useToast()

  // Update preview when value changes
  if (value !== preview) {
    setPreview(value)
  }

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      showToast({
        type: "error",
        title: "File too large",
        message: `Maximum file size is 2MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`,
        duration: 5000,
      })
      return
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      showToast({
        type: "error",
        title: "Invalid file type",
        message: `Allowed formats: JPG, PNG, GIF, WebP, SVG`,
        duration: 5000,
      })
      return
    }

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)

    // Upload to server
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      onChange(result.url)
      showToast({
        type: "success",
        title: "Image uploaded successfully",
        duration: 3000,
      })
    } catch (error) {
      console.error('Upload error:', error)
      setPreview(value) // Revert to original value
      showToast({
        type: "error",
        title: "Upload failed",
        message: error instanceof Error ? error.message : "Failed to upload image",
        duration: 5000,
      })
    } finally {
      setIsUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [value, onChange, showToast])

  const handleRemove = useCallback(() => {
    setPreview(undefined)
    onRemove?.()
  }, [onRemove])

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {preview ? (
        <div className="relative group">
          <div className="aspect-video rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Upload className="w-4 h-4 text-white" />
              )}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-500/80 backdrop-blur-sm rounded-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          {isUploading && (
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white">
              Uploading...
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full aspect-video rounded-lg border-2 border-dashed border-neutral-700 hover:border-neutral-600 transition-colors flex flex-col items-center justify-center gap-2 bg-neutral-800/50 disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-neutral-400 animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-neutral-500" />
              <div className="text-center">
                <p className="text-sm text-neutral-400">Click to upload image</p>
                <p className="text-xs text-neutral-500 mt-1">JPG, PNG, GIF, WebP, SVG (max 2MB)</p>
              </div>
            </>
          )}
        </button>
      )}

      <input type="hidden" name="image_url" value={preview || ''} />
    </div>
  )
}
