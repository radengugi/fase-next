"use client"

import { ReactNode, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  position?: "right" | "left" | "top" | "bottom"
  size?: "sm" | "md" | "lg" | "xl"
}

const sizes = {
  sm: "w-96",
  md: "w-[500px]",
  lg: "w-[700px]",
  xl: "w-[900px]"
}

const positionStyles = {
  right: "right-0 top-0 h-full",
  left: "left-0 top-0 h-full",
  top: "top-0 left-0 right-0",
  bottom: "bottom-0 left-0 right-0"
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  size = "md"
}: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const isHorizontal = position === "right" || position === "left"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={isHorizontal
              ? { x: position === "right" ? "100%" : "-100%" }
              : { y: position === "top" ? "-100%" : "100%" }
            }
            animate={{ x: 0, y: 0 }}
            exit={isHorizontal
              ? { x: position === "right" ? "100%" : "-100%" }
              : { y: position === "top" ? "-100%" : "100%" }
            }
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed z-50 bg-neutral-900 border-l border-neutral-800 shadow-2xl",
              positionStyles[position],
              isHorizontal && sizes[size]
            )}
          >
            <div className="flex flex-col h-full">
              {(title || true) && (
                <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                  {title && (
                    <h2 className="text-xl font-semibold">{title}</h2>
                  )}
                  <button
                    onClick={onClose}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="flex-1 overflow-y-auto p-6">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

import { cn } from "@/utils/cn"
