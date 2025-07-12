export function trackPageView() {
    const data = {
      type: 'pageview',
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
    sendToBackend(data);
  }
  
  export function trackEvent(eventName: string, metadata = {}) {
    const data = {
      type: 'event',
      name: eventName,
      metadata,
      timestamp: new Date().toISOString(),
    };
    sendToBackend(data);
  }