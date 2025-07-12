import axios from 'axios';

export async function sendToBackend(data: any) {
  try {
    await axios.post('link to my backend will be put here', data);
  } catch (error) {
    console.error('Tracking failed:', error);
  }
}