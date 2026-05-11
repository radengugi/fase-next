import { createClient } from './client'

export async function testSupabaseConnection() {
  const supabase = createClient()

  try {
    // Test connection by checking the session
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Supabase connection error:', error.message)
      return { success: false, error: error.message }
    }

    return { success: true, session }
  } catch (err) {
    console.error('Connection failed:', err)
    return { success: false, error: 'Unknown error' }
  }
}
