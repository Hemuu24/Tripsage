import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = 'https://oxyjldghtsqwnxdihkvl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94eWpsZGdodHNxd254ZGloa3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTkyOTYsImV4cCI6MjA2OTE5NTI5Nn0.s7tiBa_oR-o9oKdTntlfZd3iDi-gnYYU56I1RrpRsRw'

// Get the correct redirect URL based on environment
const getRedirectUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use current domain
    const currentOrigin = window.location.origin
    return `${currentOrigin}/auth/callback`
  }
  // Server-side: use environment variable or default
  return process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    : 'https://thetripsage.vercel.app/auth/callback'
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Export the redirect URL for use in signup/login
export const getAuthRedirectUrl = getRedirectUrl 