'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  calculateVariance,
  getPreferredCollection,
  TVariance,
} from '@/lib/homeRecommendations';
import { IHouse, TCollection } from '@/data/houses';
import { usePathname } from 'next/navigation';
import { apiService } from '@/lib/apiService';

export const HouseRecommendationDebug = () => {
  const [viewedHouses, setViewedHouses] = useState<IHouse[]>([]);
  const [variance, setVariance] = useState<TVariance | null>(null);
  const [preferredCollection, setPreferredCollection] =
    useState<TCollection | null>(null);
  const pathname = usePathname();

  const viewedHouseNames = viewedHouses.map((h) => h.name);

  const handleReset = () => {
    apiService.clearHouseHistoryCookie();
    setViewedHouses([]);
    setVariance(calculateVariance([]));
    setPreferredCollection(null);
  };

  useEffect(() => {
    const getHouseHistory = async () => {
      const history = await apiService.getHouseHistoryCookie();
      setViewedHouses(history);
      setVariance(calculateVariance(history));
      setPreferredCollection(getPreferredCollection(history));
    };
    getHouseHistory();
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
          <pre>--Preferred Collection--</pre>
          <pre>{preferredCollection}</pre>
        </div>

        <Button onClick={handleReset} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
};
