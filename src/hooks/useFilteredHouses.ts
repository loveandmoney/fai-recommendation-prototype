import { IHouse } from '@/sanity/schemaTypes/documents/house';
import { useUserPreferencesStore } from '@/stores/useUserPreferences';

export const useFilteredHouses = ({
  houses,
  featuredHouse,
}: {
  houses: IHouse[];
  featuredHouse?: IHouse;
}) => {
  const { userPreferences, isInitialUserPreferences } =
    useUserPreferencesStore();

  if (isInitialUserPreferences && featuredHouse) {
    return {
      filteredHouses: [featuredHouse],
    };
  }

  const getFilteredHouses = () => {
    const filteredByBudget = houses.filter(
      (house) => house.price <= userPreferences.budget
    );

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

  return {
    filteredHouses,
  };
};
