import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

export async function sendToBackend(data: any) {
  const { error } = await supabase.from('visits').insert(data)
  if (error) console.error('Tracking error:', error)
  return !error
}