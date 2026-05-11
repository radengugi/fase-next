"use client"

import { HTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "danger"
  showLabel?: boolean
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size = "md",
      variant = "default",
      showLabel = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizes = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3"
    }

    const variants = {
      default: "bg-white",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      danger: "bg-red-500"
    }

    return (
      <div ref={ref} className="space-y-1" {...props}>
        {showLabel && (
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Progress</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div className="relative w-full overflow-hidden rounded-full bg-neutral-800">
          <motion.div
            className={cn("h-full rounded-full", variants[variant], sizes[size])}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = "Progress"

export interface CircularProgressProps {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  variant?: "default" | "success" | "warning" | "danger"
  showLabel?: boolean
  className?: string
}

export function CircularProgress({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = "default",
  showLabel = true,
  className
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const variants = {
    default: "stroke-white",
    success: "stroke-emerald-500",
    warning: "stroke-amber-500",
    danger: "stroke-red-500"
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-neutral-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={variants[variant]}
          strokeLinecap="round"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  )
}
