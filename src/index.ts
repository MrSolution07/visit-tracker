import { getVisitorId } from '@core/tracker';

console.log('Visit Tracker initialized!');
getVisitorId().then((id) => {
  console.log('Visitor ID:', id);
});