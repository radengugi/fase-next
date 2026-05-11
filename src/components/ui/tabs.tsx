"use client"

import { ReactNode, createContext, useContext, useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export interface TabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps {
  children: ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn("inline-flex items-center gap-1 bg-neutral-900/50 p-1 rounded-lg", className)}>
      {children}
    </div>
  )
}

export interface TabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used within Tabs")

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === value

  return (
    <motion.button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
        isActive ? "text-white" : "text-neutral-400 hover:text-white"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-neutral-800 rounded-md"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used within Tabs")

  const { activeTab } = context
  const isActive = activeTab === value

  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
