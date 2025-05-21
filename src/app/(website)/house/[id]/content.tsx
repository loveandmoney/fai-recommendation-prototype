'use client';

import { HouseData } from '@/components/HouseData';
import { IHouse } from '@/data/houses';
import { trackHouseView } from '@/lib/homeRecommendations';
import { useEffect } from 'react';

export default function HouseContent({ house }: { house: IHouse }) {
  useEffect(() => {
    trackHouseView(house);
  }, [house]);

  return <HouseData house={house} />;
}
