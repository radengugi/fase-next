"use client"

import { Bell, Search, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export function TopNav() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const { user } = useAuth()
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    setShowUserMenu(false)
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <header className="h-16 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 bg-neutral-900/50 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          {/* <div className="relative" ref={notifRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-neutral-800">
                    <h3 className="font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-neutral-800 last:border-0"
                      >
                        <p className="text-sm text-white mb-1">New project assigned</p>
                        <p className="text-xs text-neutral-500">2 hours ago</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors"
            >
              <Avatar
                src={user?.avatar_url || undefined}
                fallback={user?.full_name || user?.email?.split("@")[0] || "?"}
                size="sm"
              />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-white">
                  {user?.full_name}
                </p>
                <p className="text-xs text-neutral-500">
                  {user?.role?.replace("_", " ")}
                </p>
              </div>
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <button
                    onClick={() => { setShowUserMenu(false); router.push("/admin/cms/settings") }}
                    className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 transition-colors"
                  >
                    Settings
                  </button>
                  <div className="h-px bg-neutral-800" />
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
