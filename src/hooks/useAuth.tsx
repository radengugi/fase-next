"use client"

import { createContext, useContext, useEffect, useState, useCallback, JSX } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import type { User as UserProfile, UserRole } from "@/types/auth"

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  hasRole: (roles: UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const hasSupabaseConfig = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const supabase = hasSupabaseConfig ? createClient() : null as any

  const fetchUserProfile = useCallback(async (authUser: User) => {
    if (!supabase) return
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .maybeSingle()

    const emailPrefix = authUser.email?.split("@")[0] ?? ""
    setUser({
      id: authUser.id,
      email: authUser.email ?? "",
      full_name: data?.full_name || authUser.user_metadata?.full_name || emailPrefix,
      avatar_url: data?.avatar_url ?? null,
      role: (data?.role ?? authUser.user_metadata?.role ?? "client") as UserRole,
    })
  }, [supabase])

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      setLoading(false)
      return
    }

    let mounted = true

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      if (mounted) {
        if (session?.user) {
          await fetchUserProfile(session.user)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase, fetchUserProfile])

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not configured')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!supabase) throw new Error('Supabase not configured')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    if (error) throw error
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const hasRole = useCallback((roles: UserRole[]) => {
    return user ? roles.includes(user.role) : false
  }, [user])

  const contextValue: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    hasRole,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
