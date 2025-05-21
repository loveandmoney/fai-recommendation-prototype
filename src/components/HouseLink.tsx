'use client';

import Link from 'next/link';
import { HouseData } from './HouseData';
import { IHouse } from '@/data/houses';
import { trackHouseView } from '@/lib/homeRecommendations';

export const HouseLink = ({ house }: { house: IHouse }) => {
  const handleClick = () => {
    console.log('click!');
    trackHouseView(house);
  };

  return (
    <Link onClick={handleClick} href={`/house/${house.id}`}>
      <HouseData house={house} />
    </Link>
  );
};
