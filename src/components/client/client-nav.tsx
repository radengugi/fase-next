"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/cn"
import { LayoutDashboard, FolderKanban, FileText, Download, LogOut, Settings } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/utils/supabase/client"

const navItems = [
  { label: "Dashboard", href: "/client", icon: LayoutDashboard },
  { label: "Projects", href: "/client/projects", icon: FolderKanban },
  { label: "Invoices", href: "/client/invoices", icon: FileText },
  { label: "Files", href: "/client/files", icon: Download },
]

export function ClientNav() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/login"
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-800 p-6 flex flex-col">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-tight text-white mb-8">
        FASE
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="pt-6 border-t border-neutral-800 space-y-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          <Avatar
            src={user?.avatar_url || undefined}
            fallback={user?.full_name || "U"}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.full_name}
            </p>
            <p className="text-xs text-neutral-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
