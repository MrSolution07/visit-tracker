import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

interface PageStat {
  path: string;
  count: number;
}

interface VisitStats {
  totalVisits: number;
  popularPages: PageStat[];
  lastHourVisits: number;
}

export async function getStats(): Promise<VisitStats> {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();


  const { data: popularPages } = await supabase
    .rpc('get_popular_pages') 
    .select('*')
    .limit(5);

  const [
    totalCount,
    lastHourCount
  ] = await Promise.all([
    supabase
      .from('visits')
      .select('*', { count: 'exact', head: true }),
      
    supabase
      .from('visits')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneHourAgo)
  ]);

  return {
    totalVisits: totalCount.count || 0,
    popularPages: (popularPages as PageStat[]) || [],
    lastHourVisits: lastHourCount.count || 0
  };
}