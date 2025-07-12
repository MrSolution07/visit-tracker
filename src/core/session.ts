import { v4 as uuidv4 } from 'uuid';

export function trackSession(): string {
  const sessionId = sessionStorage.getItem('session_id') || uuidv4();
  sessionStorage.setItem('session_id', sessionId);
  return sessionId;
}