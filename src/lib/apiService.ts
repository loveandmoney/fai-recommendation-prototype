import { IContent } from '@/data/content';
import { IHouse } from '@/data/houses';

const apiEndpoint = `${process.env.NEXT_PUBLIC_SITE_URL}/api`;

const endpoint = {
  setContentHistoryCookie: `${apiEndpoint}/set-content-history-cookie`,
  getContentHistoryCookie: `${apiEndpoint}/get-content-history-cookie`,
  clearContentHistoryCookie: `${apiEndpoint}/clear-content-history-cookie`,
  setHouseHistoryCookie: `${apiEndpoint}/set-house-history-cookie`,
  getHouseHistoryCookie: `${apiEndpoint}/get-house-history-cookie`,
  clearHouseHistoryCookie: `${apiEndpoint}/clear-house-history-cookie`,
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
  async setHouseHistoryCookie({ newHouse }: { newHouse: IHouse }) {
    const response = await fetch(endpoint.setHouseHistoryCookie, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ newHouse }),
    });

    if (!response.ok) {
      throw new Error('Error fetching view history');
    }
  },
  async getHouseHistoryCookie(): Promise<IHouse[]> {
    const response = await fetch(endpoint.getHouseHistoryCookie, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error getting view history');
    }

    const { history } = await response.json();
    return history;
  },
  async clearHouseHistoryCookie() {
    const response = await fetch(endpoint.clearHouseHistoryCookie, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error clearing view history');
    }
  },
};
