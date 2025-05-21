import { IContent } from '@/data/content';

const apiEndpoint = `${process.env.NEXT_PUBLIC_SITE_URL}/api`;

const endpoint = {
  getRecommendedContent: `${apiEndpoint}/get-recommended-content`,
};

export const apiService = {
  async getRecommendedContent(body: { contentHistory: IContent[] }) {
    const response = await fetch(endpoint.getRecommendedContent, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Error determining message type');
    }

    const { recommendedContent } = (await response.json()) as {
      recommendedContent: IContent[];
    };
    return recommendedContent;
  },
};
