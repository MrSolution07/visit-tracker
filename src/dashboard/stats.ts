// src/api/stats.ts
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_KEY as string
);

export async function getStats() {
  const { count } = await supabase
    .from('visits')
    .select('*', { count: 'exact', head: true });

  const { data: popularPages } = await supabase
    .from('visits')
    .select('path, count:count(*)')
    .order('count', { ascending: false })
    .limit(5);

  return {
    totalVisits: count,
    popularPages
  };
}
