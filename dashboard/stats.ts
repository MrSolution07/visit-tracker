export async function getStats() {
    const response = await axios.get('https://your-api.com/stats');
    return response.data;
  }