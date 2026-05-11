"use client";

import { Bell, Search, Menu } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function Topnav() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-neutral-400 hover:text-white">
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-shadow text-neutral-200 placeholder:text-neutral-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-neutral-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border border-neutral-950"></span>
        </button>

        <button
          onClick={handleSignOut}
          className="text-sm font-medium text-neutral-400 hover:text-white transition-colors ml-4"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
