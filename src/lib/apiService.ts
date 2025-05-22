import { IContent } from '@/data/content';

const apiEndpoint = `${process.env.NEXT_PUBLIC_SITE_URL}/api`;

const endpoint = {
  setContentHistoryCookie: `${apiEndpoint}/set-content-history-cookie`,
  getContentHistoryCookie: `${apiEndpoint}/get-content-history-cookie`,
  clearContentHistoryCookie: `${apiEndpoint}/clear-content-history-cookie`,
};

export const apiService = {
  async setContentHistoryCookie({ newContent }: { newContent: IContent }) {
    const response = await fetch(endpoint.setContentHistoryCookie, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ newContent }),
    });

    if (!response.ok) {
      throw new Error('Error fetching view history');
    }
  },
  async getContentHistoryCookie(): Promise<IContent[]> {
    const response = await fetch(endpoint.getContentHistoryCookie, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error getting view history');
    }

    const { history } = await response.json();
    return history;
  },
  async clearContentHistoryCookie() {
    const response = await fetch(endpoint.clearContentHistoryCookie, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error clearing view history');
    }
  },
};
