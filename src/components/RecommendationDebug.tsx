'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  calculateVariance,
  getPreferredCollections,
  getViewedHouses,
  resetViewedHouses,
  TVariance,
} from '@/lib/homeRecommendations';
import { IHouse, TCollection } from '@/data/houses';
import { usePathname } from 'next/navigation';

export const RecommendationDebug = () => {
  const [viewedHouses, setViewedHouses] = useState<IHouse[]>([]);
  const [variance, setVariance] = useState<TVariance | null>(null);
  const [preferredCollections, setPreferredCollections] = useState<
    TCollection[]
  >([]);
  const pathname = usePathname();

  const viewedHouseNames = viewedHouses.map((h) => h.name);

  const handleReset = () => {
    resetViewedHouses();
    setViewedHouses([]);
    setVariance(calculateVariance([]));
    setPreferredCollections([]);
  };

  useEffect(() => {
    const viewed = getViewedHouses();
    setViewedHouses(viewed);
    setVariance(calculateVariance(viewed));
    setPreferredCollections(getPreferredCollections(viewed));
  }, [pathname]);

  return (
    <div>
      <div className="bg-black text-white p-4 rounded-lg grid gap-4">
        <div>
          <pre>--Viewed Houses--</pre>
          <pre>{JSON.stringify(viewedHouseNames, null, 2)}</pre>
        </div>

        <div>
          <pre>--Variance--</pre>
          {variance &&
            Object.entries(variance).map(([key, { min, max }]) => (
              <pre key={key}>
                {key}: {min} - {max}
              </pre>
            ))}
        </div>

        <div>
          <pre>--Preferred Collections--</pre>
          <pre>{JSON.stringify(preferredCollections, null, 2)}</pre>
        </div>

        <Button onClick={handleReset} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
};
