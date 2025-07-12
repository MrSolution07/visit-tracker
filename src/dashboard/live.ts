import { listenForLiveVisits } from '@api/realtime';

export function showLiveVisitors(): void {
  listenForLiveVisits((data: any) => {
    const counter = document.getElementById('live-counter');
    if (counter) counter.textContent = data.count;
  });
}