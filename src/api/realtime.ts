import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export function listenForLiveVisits(callback: (count: number) => void) {
  let subscription: any; // Will hold our Supabase channel

  // Get initial count
  supabase
    .from('visits')
    .select('*', { count: 'exact', head: true })
    .then(({ count }) => callback(count || 0));

  // Create subscription
  const channel = supabase
    .channel('real-time visits')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'visits'
      },
      () => {
        supabase
          .from('visits')
          .select('*', { count: 'exact', head: true })
          .then(({ count }) => callback(count || 0));
      }
    )
    .subscribe((status, err) => {
      if (err) console.error('Subscription error:', err);
    });

  // Return cleanup function
  return {
    unsubscribe: () => supabase.removeChannel(channel)
  };
}