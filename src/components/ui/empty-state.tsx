"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import { Inbox, FileText, Users, Search, AlertCircle } from "lucide-react"

export type EmptyStateType = "default" | "search" | "users" | "files" | "error"

const icons = {
  default: Inbox,
  search: Search,
  users: Users,
  files: FileText,
  error: AlertCircle
}

export interface EmptyStateProps {
  type?: EmptyStateType
  title?: string
  description?: string
  action?: ReactNode
  className?: string
}

const defaultMessages = {
  default: {
    title: "No data found",
    description: "Get started by creating a new item."
  },
  search: {
    title: "No results found",
    description: "Try adjusting your search or filter criteria."
  },
  users: {
    title: "No users yet",
    description: "Invite team members to collaborate."
  },
  files: {
    title: "No files uploaded",
    description: "Upload files to get started."
  },
  error: {
    title: "Something went wrong",
    description: "An error occurred while loading data."
  }
}

export function EmptyState({
  type = "default",
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  const Icon = icons[type]
  const messages = defaultMessages[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <div className="w-16 h-16 mb-4 rounded-full bg-neutral-900 flex items-center justify-center">
        <Icon className="w-8 h-8 text-neutral-600" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {title || messages.title}
      </h3>
      <p className="text-sm text-neutral-400 max-w-sm mb-6">
        {description || messages.description}
      </p>
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}
