"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  FileText,
  CreditCard,
  Settings
} from "lucide-react";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Tasks", href: "/admin/tasks", icon: CheckSquare },
  { name: "Files", href: "/admin/files", icon: FileText },
  { name: "Invoices", href: "/admin/invoices", icon: CreditCard },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-neutral-800 bg-neutral-950 flex flex-col h-screen">
      <div className="h-16 flex items-center px-6 border-b border-neutral-800">
        <h1 className="text-xl font-bold tracking-tighter">FASE Admin</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
            <Users className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-neutral-500 truncate">admin@fase.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
