"use client"

import { HTMLAttributes, forwardRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

export interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, "type"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: "sm" | "md" | "lg"
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked: controlledChecked, onCheckedChange, disabled, size = "md", ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(false)
    const checked = controlledChecked ?? internalChecked

    const sizes = {
      sm: { width: "w-8", height: "h-4", dot: "w-3 h-3" },
      md: { width: "w-11", height: "h-6", dot: "w-5 h-5" },
      lg: { width: "w-14", height: "h-7", dot: "w-6 h-6" }
    }

    const toggle = () => {
      if (disabled) return
      const newChecked = !checked
      setInternalChecked(newChecked)
      onCheckedChange?.(newChecked)
    }

    return (
      <motion.button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={toggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-neutral-900",
          checked ? "bg-white" : "bg-neutral-700",
          disabled && "opacity-50 cursor-not-allowed",
          sizes[size].width,
          sizes[size].height,
          className
        )}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        {...props}
      >
        <motion.span
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow-lg transform transition-transform",
            checked ? "bg-neutral-900" : "bg-white",
            sizes[size].dot
          )}
          animate={{ x: checked ? "calc(100% - 4px)" : "0px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ y: "-50%", top: "50%" }}
        />
      </motion.button>
    )
  }
)

Switch.displayName = "Switch"
