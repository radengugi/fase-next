"use client"

import { HTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import { User } from "lucide-react"

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg"
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const initials = fallback
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center text-white font-medium overflow-hidden",
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <User className="w-1/2 h-1/2 text-neutral-500" />
        )}
      </motion.div>
    )
  }
)

Avatar.displayName = "Avatar"

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
}

export function AvatarGroup({ children, max, className }: AvatarGroupProps) {
  const avatars = Array.isArray(children) ? children : [children]
  const visibleAvatars = max ? avatars.slice(0, max) : avatars
  const remainingCount = max ? avatars.length - max : 0

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleAvatars.map((avatar, i) => (
        <div key={i} className="ring-2 ring-neutral-900 rounded-full">
          {avatar}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className={cn("ring-2 ring-neutral-900 rounded-full", max ? "w-8 h-8" : "w-10 h-10")}>
          <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center text-xs font-medium text-neutral-400">
            +{remainingCount}
          </div>
        </div>
      )}
    </div>
  )
}
