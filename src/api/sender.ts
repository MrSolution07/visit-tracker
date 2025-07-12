// src/api/sender.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_KEY as string
);


export async function sendToBackend(data: {
  path: string;
  referrer: string;
  user_agent: string;
  visitor_id: string;
}) {
  await supabase.from('visits').insert(data);
}

// Realtime subscription
export function listenForLiveVisits(callback: (visit: any) => void) {
  return supabase
    .channel('visits')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'visits'
    }, (payload) => callback(payload.new))
    .subscribe();
}