"use client"

import { useState, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/components/ui/toast"
import { Plus, Pencil, Trash2, AlertTriangle, Eye, EyeOff } from "lucide-react"

export interface CmsItem {
  id: string
  is_active?: boolean
  sort_order?: number
  [key: string]: any
}

interface CmsItemManagerProps<T extends CmsItem> {
  title: string
  items: T[]
  loading: boolean
  error: string | null
  onRefetch: () => void
  onDelete: (id: string) => Promise<{ success: boolean; error?: string | null }>
  onToggleActive?: (id: string, active: boolean) => Promise<{ success: boolean; error?: string | null }>
  renderCard: (item: T, onEdit: (item: T) => void, onDelete: (item: T) => void) => ReactNode
  renderForm: (item: T | null, onSuccess: () => void, onCancel: () => void) => ReactNode
  addLabel?: string
}

export function CmsItemManager<T extends CmsItem>({
  title,
  items,
  loading,
  error,
  onRefetch,
  onDelete,
  onToggleActive,
  renderCard,
  renderForm,
  addLabel = "Add Item",
}: CmsItemManagerProps<T>) {
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<T | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null)
  const { showToast } = useToast()

  const handleEdit = (item: T) => {
    setEditItem(item)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditItem(null)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditItem(null)
    onRefetch()
    showToast({ type: "success", title: "Saved", message: "Content updated successfully." })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    const result = await onDelete(deleteTarget.id)
    if (result.success) {
      showToast({ type: "success", title: "Deleted", message: "Item deleted." })
      setDeleteTarget(null)
      onRefetch()
    } else {
      showToast({ type: "error", title: "Error", message: result.error || "Failed to delete item." })
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            {addLabel}
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">{error}</div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-12 text-neutral-500">No items yet. Click "{addLabel}" to create the first one.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item.id}>
                {renderCard(item, handleEdit, (i) => setDeleteTarget(i))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal */}
      <Modal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditItem(null) }}
        title={editItem ? `Edit ${title.replace(/s$/, '')}` : addLabel}
        size="md"
      >
        {renderForm(editItem, handleFormSuccess, () => { setShowForm(false); setEditItem(null) })}
      </Modal>

      {/* Delete confirmation */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Item"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-white">This action cannot be undone. Are you sure?</p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setDeleteTarget(null)} className="flex-1">Cancel</Button>
            <Button onClick={handleDeleteConfirm} className="flex-1 bg-red-600 hover:bg-red-700">Delete</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
