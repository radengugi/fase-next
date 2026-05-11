"use client"

import { HTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  variant?: "default" | "glass"
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom text-sm",
          variant === "glass" && "bg-neutral-900/50 backdrop-blur-sm",
          className
        )}
        {...props}
      />
    </div>
  )
)

Table.displayName = "Table"

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b [&_tr]:border-neutral-800", className)} {...props} />
  )
)

TableHeader.displayName = "TableHeader"

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <motion.tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    />
  )
)

TableBody.displayName = "TableBody"

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t border-neutral-800 bg-neutral-900/50", className)} {...props} />
  )
)

TableFooter.displayName = "TableFooter"

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <motion.tr
      ref={ref}
      className={cn(
        "border-b border-neutral-800 transition-colors hover:bg-white/5 data-[state=selected]:bg-white/10",
        className
      )}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  )
)

TableRow.displayName = "TableRow"

export const TableHead = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-neutral-400 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
)

TableHead.displayName = "TableHead"

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  colSpan?: number
  rowSpan?: number
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, colSpan, rowSpan, ...props }, ref) => (
    <td
      ref={ref}
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  )
)

TableCell.displayName = "TableCell"

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-neutral-500", className)} {...props} />
  )
)

TableCaption.displayName = "TableCaption"

export interface SortableHeaderProps {
  column: string
  label: string
  sortColumn?: string
  sortDirection?: "asc" | "desc" | null
  onSort?: (column: string) => void
}

export function SortableHeader({ column, label, sortColumn, sortDirection, onSort }: SortableHeaderProps) {
  const isSorted = sortColumn === column

  return (
    <TableHead>
      <button
        onClick={() => onSort?.(column)}
        className="group flex items-center gap-2 hover:text-white transition-colors"
      >
        {label}
        <span className="text-neutral-500 group-hover:text-neutral-400">
          {isSorted ? (
            sortDirection === "asc" ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )
          ) : (
            <ChevronsUpDown className="w-4 h-4" />
          )}
        </span>
      </button>
    </TableHead>
  )
}
