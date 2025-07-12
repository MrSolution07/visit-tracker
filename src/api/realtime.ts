import Pusher from 'pusher-js';

export function listenForLiveVisits(callback: (data: any) => void): void {
  const pusher = new Pusher('YOUR_KEY', { cluster: 'us2' });
  const channel = pusher.subscribe('visits');
  channel.bind('new-visit', callback);
}