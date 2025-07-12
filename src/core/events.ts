import { sendToBackend } from '@api/sender';
import { getVisitorId } from './tracker';

export async function trackPageView(): Promise<void> {
  const visitor_id = await getVisitorId();
  const data = {
    path: window.location.pathname,
    referrer: document.referrer,
    user_agent: navigator.userAgent,
    visitor_id,
  };
  sendToBackend(data);
}

export async function trackEvent(eventName: string, metadata = {}): Promise<void> {
  const visitor_id = await getVisitorId();
  const data = {
    path: window.location.pathname,
    referrer: document.referrer,
    user_agent: navigator.userAgent,
    visitor_id,

    event_name: eventName,
    event_metadata: metadata,
  };
  sendToBackend(data);
}