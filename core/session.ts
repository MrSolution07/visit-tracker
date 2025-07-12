export function trackSession() {
    const sessionId = sessionStorage.getItem('session_id') || uuidv4();
    sessionStorage.setItem('session_id', sessionId);
    return sessionId;
  }