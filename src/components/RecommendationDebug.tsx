'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  calculateVariance,
  getViewedHouses,
  resetViewedHouses,
} from '@/lib/homeRecommendations';
import { IHouse } from '@/data/houses';
import { usePathname } from 'next/navigation';

export const RecommendationDebug = () => {
  const [viewedHouses, setViewedHouses] = useState<IHouse[]>([]);
  const pathname = usePathname();

  const viewedHouseNames = viewedHouses.map((h) => h.name);

  const handleReset = () => {
    resetViewedHouses();
    setViewedHouses(getViewedHouses());
  };

  const variance = calculateVariance(viewedHouses);

  useEffect(() => {
    setViewedHouses(getViewedHouses());
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
          {Object.entries(variance).map(([key, { min, max }]) => (
            <pre key={key}>
              {key}: {min} - {max}
            </pre>
          ))}
        </div>

        <Button onClick={handleReset} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
};
