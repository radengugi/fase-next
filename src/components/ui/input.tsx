"use client"

import { InputHTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-neutral-300">
            {label}
          </label>
        )}
        <motion.input
          ref={ref}
          type={type}
          className={`
            flex h-10 w-full rounded-md border px-3 py-2 text-sm
            bg-neutral-900/50 backdrop-blur-sm
            border-neutral-800 text-white
            placeholder:text-neutral-500
            focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50
            transition-all duration-200
            ${error ? "border-red-500/50 focus:ring-red-500/20" : ""}
            ${className || ""}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
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

Input.displayName = "Input"

export const Textarea = forwardRef<HTMLTextAreaElement, InputProps & { rows?: number }>(
  ({ className, label, error, rows = 4, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-neutral-300">
            {label}
          </label>
        )}
        <motion.textarea
          ref={ref}
          rows={rows}
          className={`
            flex w-full rounded-md border px-3 py-2 text-sm
            bg-neutral-900/50 backdrop-blur-sm
            border-neutral-800 text-white
            placeholder:text-neutral-500
            focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50
            transition-all duration-200 resize-none
            ${error ? "border-red-500/50 focus:ring-red-500/20" : ""}
            ${className || ""}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
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

Textarea.displayName = "Textarea"
