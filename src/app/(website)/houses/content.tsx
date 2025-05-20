'use client';

import { FeaturedHouse } from '@/components/FeaturedHouse';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { IHouse } from '@/sanity/schemaTypes/documents/house';
import Image from 'next/image';

export default function HousesContent({ houses }: { houses: IHouse[] }) {
  const { userPreferences, hasMounted } = useUserPreferences();
  const { budget, buyerType, serviceType } = userPreferences;

  if (!hasMounted) return <p>Loading...</p>;

  const getMostExpensiveHouseInBudget = (houses: IHouse[]): IHouse | null => {
    const inBudget = houses.filter((house) => house.price <= budget);
    return inBudget.length
      ? inBudget.reduce((a, b) => (a.price > b.price ? a : b))
      : null;
  };

  const getHouseMatchingTag = (
    tag: string | null | undefined,
    tagSelector: (house: IHouse) => string[]
  ): IHouse | null => {
    if (!tag) return null;

    console.log('Tag:', tag);
    console.log('Tag selector:', tagSelector);

    const matches = houses.filter((house) =>
      (tagSelector(house) ?? []).includes(tag)
    );
    return getMostExpensiveHouseInBudget(matches) || matches[0] || null;
  };

  const getFeaturedHouse = (): IHouse => {
    const houseByBuyerTag = getHouseMatchingTag(
      buyerType,
      (house) => house.dynamicContentTags.buyerTags
    );
    if (houseByBuyerTag) {
      console.log('House by buyer tag:', houseByBuyerTag);
      return houseByBuyerTag;
    }

    const houseByServiceTag = getHouseMatchingTag(
      serviceType,
      (h) => h.dynamicContentTags.serviceTags
    );
    if (houseByServiceTag) {
      console.log('House by service tag:', houseByServiceTag);
      return houseByServiceTag;
    }

    const mostExpensiveHouseInBudget = getMostExpensiveHouseInBudget(houses);
    if (mostExpensiveHouseInBudget) {
      console.log('Expensive by budget:', mostExpensiveHouseInBudget);
      return mostExpensiveHouseInBudget;
    }

    console.log('Fallback to first house:', houses[0]);

    return houses[0];
  };

  const featuredHouse = getFeaturedHouse();
  const allOtherHouses = houses.filter((h) => h._id !== featuredHouse._id);

  if (!hasMounted) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid gap-8">
      <FeaturedHouse {...featuredHouse} />

      <ul className="grid gap-4 grid-cols-4">
        {allOtherHouses.map(({ price, title, photo }, i) => (
          <li key={i} className="border rounded-lg p-4">
            <h2 className="font-bold text-lg">{title}</h2>
            <p className="mb-2">${price.toLocaleString()}.00</p>
            <div className="rounded-md overflow-hidden max-w-full aspect-square">
              <Image
                className="w-full h-full"
                width={500}
                height={500}
                src={photo.src}
                alt={photo.alt || ''}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
