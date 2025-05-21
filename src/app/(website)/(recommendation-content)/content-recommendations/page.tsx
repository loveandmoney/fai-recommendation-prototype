'use client';

import { ContentLink } from '@/components/ContentLink';
import { IContent } from '@/data/content';
import { getRecommendedContent } from '@/lib/contentRecommendations';
import { useEffect, useState } from 'react';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<IContent[]>([]);

  useEffect(() => {
    setRecommendations(getRecommendedContent());
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Recommendations</h1>
      <ul className="grid grid-cols-4 gap-4">
        {recommendations.map((content) => (
          <li key={content.id}>
            <ContentLink content={content} />
          </li>
        ))}
      </ul>
    </>
  );
}
