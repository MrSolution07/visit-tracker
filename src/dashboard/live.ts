import { listenForLiveVisits } from '@api/realtime';
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

let currentCount = 0;
let activeSubscription: { unsubscribe: () => void } | null = null;

/**
 * Displays live visitor count and returns cleanup function
 * @param elementId - ID of the DOM element to update
 * @returns Cleanup function to unsubscribe
 */
export function showLiveVisitors(elementId: string = 'live-counter'): () => void {
  const updateCounter = (count: number) => {
    currentCount = count;
    const counter = document.getElementById(elementId);
    if (counter) counter.textContent = count.toString();
  };

  // Get initial count and subscribe to updates
  activeSubscription = listenForLiveVisits(updateCounter);

  // Return cleanup function
  return () => {
    if (activeSubscription) {
      activeSubscription.unsubscribe();
      activeSubscription = null;
    }
  };
}

/**
 * Gets current visit count
 * @returns Current visit count
 */
export function getCurrentVisitCount(): number {
  return currentCount;
}

/**
 * Fetches comprehensive visit statistics
 * @returns Promise with visit statistics
 */
export async function getStats(): Promise<VisitStats> {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();

    // Execute all queries in parallel
    const [
      totalCount,
      lastHourCount,
      { data: popularPages }
    ] = await Promise.all([
      supabase
        .from('visits')
        .select('*', { count: 'exact', head: true }),
        
      supabase
        .from('visits')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', oneHourAgo),
        
      supabase.rpc('get_popular_pages').select('*').limit(5)
    ]);

    return {
      totalVisits: totalCount.count || 0,
      popularPages: (popularPages as PageStat[]) || [],
      lastHourVisits: lastHourCount.count || 0
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalVisits: 0,
      popularPages: [],
      lastHourVisits: 0
    };
  }
}

/**
 * Simplified version for quick total count
 */
export async function getTotalVisits(): Promise<number> {
  const { count } = await supabase
    .from('visits')
    .select('*', { count: 'exact', head: true });
  return count || 0;
}