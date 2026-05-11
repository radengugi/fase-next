"use client"

import { SelectHTMLAttributes, forwardRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import { ChevronDown, Check } from "lucide-react"

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string
  error?: string
  options: { value: string; label: string; disabled?: boolean }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-neutral-300">
            {label}
          </label>
        )}
        <div className="relative">
          <motion.select
            ref={ref}
            className={cn(
              "flex h-10 w-full appearance-none rounded-md border px-3 py-2 pr-10 text-sm",
              "bg-neutral-900/50 backdrop-blur-sm",
              "border-neutral-800 text-white",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50",
              "transition-all duration-200 cursor-pointer",
              error && "border-red-500/50 focus:ring-red-500/20",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            whileFocus={{ scale: 1.01 }}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </motion.select>
          <ChevronDown
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none transition-transform",
              isFocused && "transform rotate-180"
            )}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"

export interface MultiSelectProps {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  label,
  error,
  options,
  value,
  onChange,
  placeholder = "Select items..."
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOptions = options.filter((opt) => value.includes(opt.value))

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-neutral-300">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm text-left",
            "bg-neutral-900/50 backdrop-blur-sm",
            "border-neutral-800 text-white",
            "focus:outline-none focus:ring-2 focus:ring-white/20",
            "transition-all duration-200",
            error && "border-red-500/50"
          )}
        >
          <span className="flex flex-wrap gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((opt) => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 text-xs"
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleOption(opt.value)
                    }}
                    className="hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <span className="text-neutral-500">{placeholder}</span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-neutral-400 transition-transform flex-shrink-0 ml-2",
              isOpen && "transform rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-50 w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-md shadow-xl max-h-60 overflow-auto"
          >
            {options.map((option) => {
              const isSelected = value.includes(option.value)
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleOption(option.value)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors",
                    isSelected ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/5"
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
