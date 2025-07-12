## EXAMPLE OF USAGE

```ts
import { ConsistencyKey } from 'consistency-key';

const tracker = new ConsistencyKey();

// Log that the user opened the app today
tracker.markRun();

// Track when the user presses a button
tracker.trackEvent('send_message');

// Get stats
const stats = tracker.getRecord();
console.log('Streak:', stats.currentStreak);
console.log('Send message pressed:', tracker.getEventCount('send_message'));