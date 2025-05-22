import { IContent } from '@/data/content';

const apiEndpoint = `${process.env.NEXT_PUBLIC_SITE_URL}/api`;

const endpoint = {
  setContentHistoryCookie: `${apiEndpoint}/set-content-history-cookie`,
};

export const apiService = {
  async setContentHistoryCookie({ history }: { history: IContent[] }) {
    const response = await fetch(endpoint.setContentHistoryCookie, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ history }),
    });

    if (!response.ok) {
      throw new Error('Error fetching view history');
    }
  },
};
