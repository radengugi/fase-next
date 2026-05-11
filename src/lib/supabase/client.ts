import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Persist session even after closing browser
        persistSession: true,
        // Use localStorage for persistence (survives browser close)
        storage: window.localStorage,
        // Auto refresh token before it expires
        autoRefreshToken: true,
        // Detect session updates across tabs
        detectSessionInUrl: true,
        // Session flow type
        flowType: 'pkce',
      }
    }
  )
}
