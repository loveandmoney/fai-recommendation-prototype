import { houses, IHouse, TCollection } from '@/data/houses';

const properties = [
  'cost',
  'beds',
  'bathrooms',
  'livingRooms',
  'stories',
] as const;

export type TVarianceKey = (typeof properties)[number];
export type TVariance = Record<TVarianceKey, { min: number; max: number }>;

const LS_KEY = 'user_viewed_houses';
const VARIANCE_PADDING_COST_FACTOR = 0.2;
const VARIANCE_PADDING_STORIES = 0;
const VARIANCE_PADDING_BEDS = 1;
const VARIANCE_PADDING_BATHS = 1;
const VARIANCE_PADDING_LIVINGROOMS = 1;
const HISTORY_LIMIT = 3; // 3 is good as avoids ties, if adjusting may need to tweak preferred collections logic e.g. 'max < 2'

export function getViewedHouses(): IHouse[] {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
}

export function resetViewedHouses() {
  localStorage.removeItem(LS_KEY);
}

export function trackHouseView(house: IHouse) {
  const current = getViewedHouses().filter((h) => h.id !== house.id);
  const updated = [...current.slice(-HISTORY_LIMIT + 1), house];
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
}

export function getPreferredCollections(viewHistory: IHouse[]): TCollection[] {
  const counts: Record<TCollection, number> = {
    simplicity: 0,
    bridgewater: 0,
    elegance: 0,
  };

  for (const house of viewHistory) {
    counts[house.collection]++;
  }

  const max = Math.max(...Object.values(counts));
  if (max < 2) return [];

  return (Object.entries(counts) as [TCollection, number][])
    .filter(([, count]) => count === max)
    .map(([collection]) => collection);
}

export function calculateVariance(houses: IHouse[]) {
  if (houses.length === 0) {
    return properties.reduce((acc, key) => {
      acc[key] = { min: 0, max: 0 };
      return acc;
    }, {} as TVariance);
  }

  return properties.reduce((acc, key) => {
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
  }, {} as TVariance);
}

export function getRecommendedHouses(): IHouse[] {
  const viewed = getViewedHouses();
  if (viewed.length === 0) return [];

  const variance = calculateVariance(viewed);

  const filteredByVariance = houses.filter((house) =>
    properties.every((prop) => {
      const value = house[prop];
      const { min, max } = variance[prop];
      return value >= min && value <= max;
    })
  );

  const preferredCollections = getPreferredCollections(viewed);

  const sortedByPreferredCollections = [...filteredByVariance].sort((a, b) => {
    const aPref = preferredCollections.includes(a.collection) ? 1 : 0;
    const bPref = preferredCollections.includes(b.collection) ? 1 : 0;
    return bPref - aPref;
  });

  return sortedByPreferredCollections;
}
