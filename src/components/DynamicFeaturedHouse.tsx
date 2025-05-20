'use client';

import { IHouse } from '@/sanity/schemaTypes/documents/house';
import { FeaturedHouse } from './FeaturedHouse';
import { useFilteredHouses } from '@/hooks/useFilteredHouses';

export const DynamicFeaturedHouse = ({
  houses,
  featuredHouse,
}: {
  houses: IHouse[];
  featuredHouse: IHouse;
}) => {
  const { filteredHouses } = useFilteredHouses({ houses, featuredHouse });

  return <FeaturedHouse {...(filteredHouses[0] || featuredHouse)} />;
};
