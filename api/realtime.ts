import Pusher from 'pusher-js';

const pusher = new Pusher('YOUR_KEY', { cluster: 'us2' });

export function listenForLiveVisits(callback: (data: any) => void) {
  const channel = pusher.subscribe('visits');
  channel.bind('new-visit', callback);
}