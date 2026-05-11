// Fix for Supabase type definitions
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Export commonly used types
export type ClientStatus = 'lead' | 'active' | 'completed' | 'on_hold'
export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed' | 'cancelled'
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent'
export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
export type UserRole = 'super_admin' | 'admin' | 'project_manager' | 'designer' | 'developer' | 'client'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'super_admin' | 'admin' | 'project_manager' | 'designer' | 'developer' | 'client'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'super_admin' | 'admin' | 'project_manager' | 'designer' | 'developer' | 'client'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'super_admin' | 'admin' | 'project_manager' | 'designer' | 'developer' | 'client'
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          company_name: string
          contact_name: string
          phone: string | null
          website: string | null
          industry: string | null
          status: 'lead' | 'active' | 'completed' | 'on_hold'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          contact_name: string
          phone?: string | null
          website?: string | null
          industry?: string | null
          status?: 'lead' | 'active' | 'completed' | 'on_hold'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          contact_name?: string
          phone?: string | null
          website?: string | null
          industry?: string | null
          status?: 'lead' | 'active' | 'completed' | 'on_hold'
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string
          name: string
          description: string | null
          status: 'planning' | 'in_progress' | 'review' | 'completed' | 'cancelled'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          start_date: string | null
          end_date: string | null
          budget: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          name: string
          description?: string | null
          status?: 'planning' | 'in_progress' | 'review' | 'completed' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          name?: string
          description?: string | null
          status?: 'planning' | 'in_progress' | 'review' | 'completed' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          client_id: string
          project_id: string | null
          invoice_number: string
          amount: number
          status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
          issue_date: string
          due_date: string
          paid_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          project_id?: string | null
          invoice_number: string
          amount: number
          status?: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
          issue_date: string
          due_date: string
          paid_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          project_id?: string | null
          invoice_number?: string
          amount?: number
          status?: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
          issue_date?: string
          due_date?: string
          paid_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      files: {
        Row: {
          id: string
          project_id: string | null
          client_id: string | null
          name: string
          file_path: string
          file_size: number
          mime_type: string
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          client_id?: string | null
          name: string
          file_path: string
          file_size: number
          mime_type: string
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          client_id?: string | null
          name?: string
          file_path?: string
          file_size?: number
          mime_type?: string
          uploaded_by?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
