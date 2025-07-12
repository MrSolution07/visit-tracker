import { getVisitorId } from '@core/tracker';
import { trackPageView, trackEvent } from '@core/events';
import { trackSession } from '@core/session';
import { sendToBackend } from '@api/sender';
import { listenForLiveVisits } from '@api/realtime';
import { showLiveVisitors, getStats, getCurrentVisitCount } from './dashboard/live';


export {
  getVisitorId,
  trackPageView,
  trackEvent,
  trackSession,
  sendToBackend,
  listenForLiveVisits,
  showLiveVisitors,
  getStats,
  getCurrentVisitCount
};

/**
 * Initializes the visit tracker
 */
export async function initTracker(config?: { debug?: boolean }) {
  if (typeof window === 'undefined') {
    throw new Error('Visit tracker requires browser environment');
  }

  try {
    if (config?.debug) {
      console.log('Visit Tracker initializing...');
    }
    
    const visitorId = await getVisitorId();
    await trackPageView(); 
    
    if (config?.debug) {
      console.log('Visitor ID:', visitorId);
    }
    
    return visitorId;
  } catch (error) {
    console.error('Visit Tracker initialization failed:', error);
    throw error;
  }
}


if (typeof window !== 'undefined' && import.meta.env?.MODE !== 'test') {
  initTracker({ debug: true }).catch(() => {});
}