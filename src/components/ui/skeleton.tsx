"use client"

import { HTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "text", width, height, ...props }, ref) => {
    const variantStyles = {
      text: "rounded h-4",
      circular: "rounded-full",
      rectangular: "rounded-md"
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-neutral-800 animate-pulse",
          variantStyles[variant],
          className
        )}
        style={{ width, height }}
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = "Skeleton"

export function SkeletonCard() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={14} />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton width="100%" height={12} />
        <Skeleton width="100%" height={12} />
        <Skeleton width="80%" height={12} />
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 pb-2 border-b border-neutral-800">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} width={`${100 / 5}%`} height={16} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {[1, 2, 3, 4, 5].map((j) => (
            <Skeleton key={j} width={`${100 / 5}%`} height={14} />
          ))}
        </div>
      ))}
    </div>
  )
}
