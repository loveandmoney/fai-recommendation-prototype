'use client';

import Link from 'next/link';
import { HouseData } from './HouseData';
import { IHouse } from '@/data/houses';
import { apiService } from '@/lib/apiService';

export const HouseLink = ({ house }: { house: IHouse }) => {
  const handleClick = async () => {
    try {
      await apiService.setHouseHistoryCookie({ newHouse: house });
    } catch (error) {
      console.error('Error tracking content view:', error);
    }
  };

  return (
    <Link onClick={handleClick} href={`/house/${house.id}`}>
      <HouseData house={house} />
    </Link>
  );
};
