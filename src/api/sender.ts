import axios from 'axios';

export async function sendToBackend(data: any): Promise<void> {
  try {
    await axios.post('https://your-api.com/track', data);
  } catch (error) {
    console.error('Tracking failed:', error);
  }
}