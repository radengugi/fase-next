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
  const supabase = createClient()

  // Memoize fetchUserProfile to prevent re-creation
  const fetchUserProfile = useCallback(async (authUser: User) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single()

    if (data && !error) {
      setUser({
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        role: data.role as UserRole
      })
    }
  }, [supabase])

  useEffect(() => {
    let mounted = true

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (mounted && session?.user) {
        await fetchUserProfile(session.user)
      }
      if (mounted) setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error

    // Profile will be created by trigger
  }

  const signOut = async () => {
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
