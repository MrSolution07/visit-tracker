import { sendToBackend } from '@api/sender';
import { getVisitorId } from './tracker';

export async function trackPageView(): Promise<void> {
  await sendToBackend({
    path: window.location.pathname,
    referrer: document.referrer,
    user_agent: navigator.userAgent,
    visitor_id: await getVisitorId()
  });
}

export async function trackEvent(
  eventName: string, 
  metadata: object = {}
): Promise<void> {
  await sendToBackend({
    event_name: eventName,
    event_metadata: metadata,
    path: window.location.pathname,
    visitor_id: await getVisitorId()
  });
}