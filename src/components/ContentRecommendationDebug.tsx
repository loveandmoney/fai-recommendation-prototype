'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { IContent } from '@/data/content';

import { apiService } from '@/lib/apiService';

export const ContentRecommendationDebug = () => {
  const [viewedContent, setViewedContent] = useState<IContent[]>([]);

  const pathname = usePathname();

  const viewedContentNames = viewedContent.map((c) => c.title);
  const allViewedTags = viewedContent.flatMap((c) => c.tags);
  const uniqueViewedTags = [...new Set(allViewedTags)];

  const handleReset = () => {
    apiService.clearContentHistoryCookie();
    setViewedContent([]);
  };

  useEffect(() => {
    const getContentHistory = async () => {
      const history = await apiService.getContentHistoryCookie();
      setViewedContent(history);
    };
    getContentHistory();
  }, [pathname]);

  return (
    <div>
      <div className="bg-black text-white p-4 rounded-lg grid gap-4">
        <div>
          <pre>--Viewed Content--</pre>
          <pre>{JSON.stringify(viewedContentNames, null, 2)}</pre>
        </div>

        <div>
          <pre>--Viewed Tags--</pre>
          <pre>{JSON.stringify(uniqueViewedTags, null, 2)}</pre>
        </div>

        <Button onClick={handleReset} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
};
