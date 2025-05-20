'use client';

import { FeaturedHouse } from '@/components/FeaturedHouse';
import { SearchFilters } from '@/components/SearchFilters';
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

  const getFilteredHouses = () => {
    const filteredByBudget = houses.filter((house) => house.price <= budget);

    const filteredByBeds = filteredByBudget.filter((house) => {
      if (!userPreferences.beds) return true;

      switch (userPreferences.beds) {
        case '3+':
          if (
            house.beds === '3+' ||
            house.beds === '4+' ||
            house.beds === '5+'
          ) {
            return true;
          }
        case '4+':
          if (house.beds === '4+' || house.beds === '5+') {
            return true;
          }
        case '5+':
          if (house.beds === '5+') {
            return true;
          }
      }
    });

    const filteredByBaths = filteredByBeds.filter((house) => {
      if (!userPreferences.baths) return true;

      switch (userPreferences.baths) {
        case '2+':
          if (
            house.baths === '2+' ||
            house.baths === '3+' ||
            house.baths === '4+'
          ) {
            return true;
          }
        case '3+':
          if (house.baths === '3+' || house.baths === '4+') {
            return true;
          }
        case '4+':
          if (house.baths === '4+') {
            return true;
          }
      }
    });

    const filteredByStories = filteredByBaths.filter((house) => {
      if (!userPreferences.stories) return true;

      switch (userPreferences.stories) {
        case '1':
          if (house.stories === '1' || house.stories === '2') {
            return true;
          }
        case '2':
          if (house.stories === '2') {
            return true;
          }
      }
    });

    return filteredByStories;
  };
  const filteredHouses = getFilteredHouses();

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
