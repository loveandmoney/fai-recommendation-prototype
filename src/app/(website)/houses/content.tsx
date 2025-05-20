'use client';

import { FeaturedHouse } from '@/components/FeaturedHouse';
import { SearchFilters } from '@/components/SearchFilters';
import { useFilteredHouses } from '@/hooks/useFilteredHouses';
import { IHouse } from '@/sanity/schemaTypes/documents/house';
import { useUserPreferencesStore } from '@/stores/useUserPreferences';
import Image from 'next/image';

export default function HousesContent({
  houses,
  defaultFeatureHouseId,
}: {
  houses: IHouse[];
  defaultFeatureHouseId: string;
}) {
  const { userPreferences, isInitialUserPreferences } =
    useUserPreferencesStore();
  const { budget, buyerType, serviceType } = userPreferences;
  const { filteredHouses } = useFilteredHouses({ houses });

  const defaultHouse = houses.find(
    (house) => house._id === defaultFeatureHouseId
  );
  const randomHouse = houses[Math.floor(Math.random() * houses.length)];
  const fallbackHouse = defaultHouse || randomHouse;

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

    const matches = houses.filter(
      (house) =>
        house.dynamicContentTags?.active === true &&
        (tagSelector(house) ?? []).includes(tag)
    );
    return getMostExpensiveHouseInBudget(matches) || matches[0] || null;
  };

  const getFeaturedHouse = (): IHouse => {
    if (isInitialUserPreferences) {
      return fallbackHouse;
    }

    const houseByBuyerTag = getHouseMatchingTag(
      buyerType,
      (house) => house.dynamicContentTags.buyerTags
    );
    if (houseByBuyerTag) {
      return houseByBuyerTag;
    }

    const houseByServiceTag = getHouseMatchingTag(
      serviceType,
      (h) => h.dynamicContentTags.serviceTags
    );
    if (houseByServiceTag) {
      return houseByServiceTag;
    }

    const mostExpensiveHouseInBudget = getMostExpensiveHouseInBudget(houses);
    if (mostExpensiveHouseInBudget) {
      return mostExpensiveHouseInBudget;
    }

    return fallbackHouse;
  };

  const featuredHouse = getFeaturedHouse();
  const allOtherHouses = houses.filter((h) => h._id !== featuredHouse._id);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="border h-full p-4 rounded-lg">
        <SearchFilters />
      </div>

      {isInitialUserPreferences && (
        <div className="grid gap-8 col-span-3">
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
      )}

      {!isInitialUserPreferences && (
        <div className="grid gap-8 col-span-3">
          <ul className="grid gap-4 grid-cols-4">
            {filteredHouses.map(({ price, title, photo }, i) => (
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
      )}
    </div>
  );
}
