"use client"

import { ReactNode, createContext, useContext, useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/utils/cn"
import { ChevronDown, Check } from "lucide-react"

interface DropdownContextType {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  selectedValue: string
  setSelectedValue: (value: string) => void
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

export interface DropdownProps {
  children: ReactNode
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function Dropdown({ children, defaultValue, onValueChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue || "")

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
    onValueChange?.(value)
    setIsOpen(false)
  }

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, selectedValue, setSelectedValue: handleValueChange }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  )
}

export interface DropdownTriggerProps {
  placeholder?: string
  className?: string
}

export function DropdownTrigger({ placeholder = "Select...", className }: DropdownTriggerProps) {
  const context = useContext(DropdownContext)
  if (!context) throw new Error("DropdownTrigger must be used within Dropdown")

  const { isOpen, setIsOpen, selectedValue } = context
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth)
    }
  }, [])

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-sm bg-neutral-900/50 border border-neutral-800 rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-white/20",
          "hover:border-neutral-700 transition-colors",
          className
        )}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className={!selectedValue ? "text-neutral-500" : "text-white"}>
          {selectedValue || placeholder}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-neutral-400 transition-transform", isOpen && "transform rotate-180")} />
      </motion.button>
    </>
  )
}

export interface DropdownContentProps {
  children: ReactNode
  className?: string
  align?: "start" | "end" | "center"
}

export function DropdownContent({ children, className, align }: DropdownContentProps) {
  const context = useContext(DropdownContext)
  if (!context) throw new Error("DropdownContent must be used within Dropdown")

  const { isOpen, selectedValue } = context

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute z-50 w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-md shadow-xl max-h-60 overflow-auto",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export interface DropdownItemProps {
  value: string
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export function DropdownItem({ value, children, disabled, onClick }: DropdownItemProps) {
  const context = useContext(DropdownContext)
  if (!context) throw new Error("DropdownItem must be used within Dropdown")

  const { selectedValue, setSelectedValue } = context
  const isSelected = selectedValue === value

  return (
    <motion.button
      type="button"
      onClick={() => { if (!disabled) { setSelectedValue(value); onClick?.() } }}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors",
        isSelected ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/5",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      whileHover={{ x: 2 }}
    >
      <span>{children}</span>
      {isSelected && <Check className="w-4 h-4 text-white" />}
    </motion.button>
  )
}

export interface DropdownLabelProps {
  children: ReactNode
}

export function DropdownLabel({ children }: DropdownLabelProps) {
  return (
    <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
      {children}
    </div>
  )
}

export interface DropdownSeparatorProps {
  className?: string
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return <div className={cn("h-px bg-neutral-800 my-1", className)} />
}
