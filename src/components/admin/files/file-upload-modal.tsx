"use client"

import { useState, useCallback } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Upload, File, X, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function FileUploadModal({ isOpen, onClose, onSuccess }: FileUploadModalProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }, [])

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    setUploading(true)
    setProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData()
        formData.append("file", files[i])

        const response = await fetch("/api/files/upload", {
          method: "POST",
          body: formData
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${files[i].name}`)
        }

        setProgress(((i + 1) / files.length) * 100)
      }

      onSuccess()
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
      setProgress(0)
      setFiles([])
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Files" size="md">
      <div className="space-y-6">
        {/* Drop Zone */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center hover:border-neutral-600 transition-colors cursor-pointer"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-neutral-600" />
          <p className="text-neutral-400 mb-2">Drag and drop files here</p>
          <p className="text-sm text-neutral-600">or click to browse</p>
          <input
            id="file-input"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800"
                >
                  <File className="w-5 h-5 text-neutral-500" />
                  <span className="flex-1 text-sm text-white truncate">{file.name}</span>
                  <span className="text-xs text-neutral-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <X className="w-4 h-4 text-neutral-500" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Uploading...</span>
              <span className="text-white">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            isLoading={uploading}
          >
            Upload {files.length} {files.length === 1 ? "File" : "Files"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
