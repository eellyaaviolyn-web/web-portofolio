import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
// Extract just the origin in case the user accidentally pasted the REST URL (e.g. /rest/v1/)
const supabaseUrl = rawUrl.startsWith('http') ? new URL(rawUrl).origin : rawUrl

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
