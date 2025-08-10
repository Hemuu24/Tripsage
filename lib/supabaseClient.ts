import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = 'https://oxyjldghtsqwnxdihkvl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94eWpsZGdodHNxd254ZGloa3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTkyOTYsImV4cCI6MjA2OTE5NTI5Nn0.s7tiBa_oR-o9oKdTntlfZd3iDi-gnYYU56I1RrpRsRw'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
}) 