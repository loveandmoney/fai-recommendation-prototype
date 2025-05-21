import { houses, IHouse } from '@/data/houses';

const LS_KEY = 'user_viewed_houses';
const VARIANCE_PADDING_COST_FACTOR = 0.25;
const VARIANCE_PADDING_STORIES = 0;
const VARIANCE_PADDING_BEDS = 1;
const VARIANCE_PADDING_BATHS = 1;
const VARIANCE_PADDING_LIVINGROOMS = 1;
const HISTORY_LIMIT = 3;

export function getViewedHouses(): IHouse[] {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
}

export function resetViewedHouses() {
  localStorage.removeItem(LS_KEY);
}

export function trackHouseView(house: IHouse) {
  const current = getViewedHouses();
  const updated = [...current.slice(-HISTORY_LIMIT + 1), house];
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
}

export function calculateVariance(houses: IHouse[]) {
  const properties = [
    'cost',
    'beds',
    'bathrooms',
    'livingRooms',
    'stories',
  ] as const;

  return properties.reduce(
    (acc, key) => {
      const values = houses.map((house) => house[key]);
      const min = Math.min(...values);
      const max = Math.max(...values);

      let padding: number;
      switch (key) {
        case 'cost':
          padding = (max - min || min) * VARIANCE_PADDING_COST_FACTOR;
          break;
        case 'beds':
          padding = VARIANCE_PADDING_BEDS;
          break;
        case 'bathrooms':
          padding = VARIANCE_PADDING_BATHS;
          break;
        case 'livingRooms':
          padding = VARIANCE_PADDING_LIVINGROOMS;
          break;
        case 'stories':
          padding = VARIANCE_PADDING_STORIES;
          break;
      }

      acc[key] = {
        min: min - padding,
        max: max + padding,
      };
      return acc;
    },
    {} as Record<
      'cost' | 'beds' | 'bathrooms' | 'livingRooms' | 'stories',
      { min: number; max: number }
    >
  );
}

export function getRecommendedHouses(): IHouse[] {
  const viewed = getViewedHouses();
  if (viewed.length === 0) return [];

  const variance = calculateVariance(viewed);

  return houses.filter((house) => {
    return (
      house.cost >= variance.cost.min &&
      house.cost <= variance.cost.max &&
      house.beds >= variance.beds.min &&
      house.beds <= variance.beds.max &&
      house.bathrooms >= variance.bathrooms.min &&
      house.bathrooms <= variance.bathrooms.max &&
      house.livingRooms >= variance.livingRooms.min &&
      house.livingRooms <= variance.livingRooms.max
    );
  });
}
