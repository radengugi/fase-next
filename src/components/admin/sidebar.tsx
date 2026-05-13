"use client"

import { Avatar } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/utils/cn"
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderKanban,
  Globe,
  LayoutDashboard,
  Upload,
  Users
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo, useState } from "react"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
  prefetch?: boolean
}

interface NavGroup {
  label: string
  icon: React.ElementType
  items: NavItem[]
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Building2 },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Invoices", href: "/admin/invoices", icon: FileText },
  { label: "Files", href: "/admin/files", icon: Upload },
]

const cmsNavItems: NavItem[] = [
  { label: "CMS Overview", href: "/admin/cms", icon: Globe },
  { label: "Hero", href: "/admin/cms/hero", icon: Globe, prefetch: true },
  { label: "About", href: "/admin/cms/about", icon: Globe, prefetch: true },
  { label: "Services", href: "/admin/cms/services", icon: Globe, prefetch: true },
  { label: "Portfolio", href: "/admin/cms/portfolio", icon: Globe, prefetch: true },
  { label: "Testimonials", href: "/admin/cms/testimonials", icon: Globe, prefetch: true },
  { label: "Team", href: "/admin/cms/team", icon: Globe, prefetch: true },
  { label: "Values", href: "/admin/cms/values", icon: Globe, prefetch: true },
]

// Memoize NavItem to prevent re-renders
const NavItem = memo(({ item, isActive, isCollapsed }: { item: NavItem; isActive: boolean; isCollapsed: boolean }) => {
  const Icon = item.icon

  return (
    <Link href={item.href} prefetch={item.prefetch} className="block">
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
        "fixed left-0 top-0 h-screen bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-800 z-40 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-800 flex-shrink-0">
        {!isCollapsed && (
          <Link href="/" className="flex items-center text-2xl font-bold tracking-tight text-white">
            <div className="relative w-24 h-10 rounded-lg flex items-center justify-center overflow-hidden group-hover:ring-[#B9fA3C]/50 transition-all duration-300">
              <Image
                src="/logo-fase.png"
                width={56}
                height={56}
                alt="FASE Logo"
                className="object-cover w-full h-full"
              />
            </div>
            {/* <div className="relative w-9 h-9 rounded-lg bg-[#B9fA3C] flex items-center justify-center overflow-hidden">
              <Image
                src="/blue-fase.png"
                width={72}
                height={72}
                alt="FASE Logo"
                className="rounded-lg object-contain p-1.5"
              />
            </div>
            <span className="text-lg font-bold tracking-tight dark:text-white text-[#B9fA3C] ml-2">
              FASE Creative
            </span> */}
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
      <nav className="p-4 space-y-1 overflow-y-auto flex-1">
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

        {/* CMS Group */}
        {!isCollapsed && (
          <div className="pt-4">
            <p className="px-3 mb-1 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Website CMS</p>
            {cmsNavItems.map((item) => {
              const isActive = item.href === "/admin/cms"
                ? pathname === "/admin/cms"
                : pathname.startsWith(item.href)
              return (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={isActive}
                  isCollapsed={isCollapsed}
                />
              )
            })}
          </div>
        )}
        {isCollapsed && (
          <div className="pt-2 border-t border-neutral-800">
            <Link href="/admin/cms">
              <div className={cn(
                "flex items-center justify-center px-3 py-2.5 rounded-lg transition-all relative",
                pathname.startsWith("/admin/cms") ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white hover:bg-white/5"
              )}>
                <Globe className="w-5 h-5" />
              </div>
            </Link>
          </div>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-neutral-800 flex-shrink-0">
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
