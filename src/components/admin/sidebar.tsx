"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/cn"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Building2,
  FileText,
  Upload,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useState, memo } from "react"
import { Avatar } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Building2 },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Invoices", href: "/admin/invoices", icon: FileText },
  { label: "Files", href: "/admin/files", icon: Upload },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

// Memoize NavItem to prevent re-renders
const NavItem = memo(({ item, isActive, isCollapsed }: { item: NavItem; isActive: boolean; isCollapsed: boolean }) => {
  const Icon = item.icon

  return (
    <Link href={item.href} className="block">
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative",
          isActive
            ? "bg-white/10 text-white"
            : "text-neutral-400 hover:text-white hover:bg-white/5"
        )}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && (
          <span className="flex-1 font-medium">
            {item.label}
          </span>
        )}
        {!isCollapsed && item.badge && (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/10">
            {item.badge}
          </span>
        )}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
        )}
      </div>
    </Link>
  )
})

NavItem.displayName = "NavItem"

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user } = useAuth()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-800 z-40 transition-all duration-300",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-800">
        {!isCollapsed && (
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">
            FASE
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto p-2 rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-neutral-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <NavItem
              key={item.href}
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
            />
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
          <Avatar
            src={user?.avatar_url ?? undefined}
            fallback={user?.full_name ?? "User"}
            size="sm"
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.full_name}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {user?.role?.replace("_", " ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
