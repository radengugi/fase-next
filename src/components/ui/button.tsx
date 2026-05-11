"use client"

import { ButtonHTMLAttributes, forwardRef } from "react"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      primary: "bg-white text-black hover:bg-neutral-200 shadow-lg shadow-white/10",
      secondary: "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700",
      ghost: "text-neutral-300 hover:text-white hover:bg-white/5",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20"
    }

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base"
    }

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = "Button"
