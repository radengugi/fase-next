"use client"

import { ReactNode, createContext, useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/utils/cn"

interface DropdownMenuContextType {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined)

export interface DropdownMenuProps {
  children: ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

export interface DropdownMenuTriggerProps {
  children: ReactNode
  className?: string
}

export function DropdownMenuTrigger({ children, className }: DropdownMenuTriggerProps) {
  const context = useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu")

  const { isOpen, setIsOpen } = context

  return (
    <motion.button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export interface DropdownMenuContentProps {
  children: ReactNode
  align?: "start" | "end"
  className?: string
}

export function DropdownMenuContent({ children, align = "end", className }: DropdownMenuContentProps) {
  const context = useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu")

  const { isOpen } = context

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute z-50 min-w-[160px] bg-neutral-900 border border-neutral-800 rounded-md shadow-xl py-1",
            align === "end" ? "right-0" : "left-0",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export interface DropdownMenuItemProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function DropdownMenuItem({ children, onClick, disabled, className }: DropdownMenuItemProps) {
  const context = useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuItem must be used within DropdownMenu")

  const { setIsOpen } = context

  return (
    <motion.button
      type="button"
      onClick={() => {
        onClick?.()
        setIsOpen(false)
      }}
      disabled={disabled}
      className={cn(
        "w-full flex items-center px-3 py-2 text-sm text-left transition-colors",
        "text-neutral-300 hover:bg-white/5 hover:text-white",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={{ x: 2 }}
    >
      {children}
    </motion.button>
  )
}
