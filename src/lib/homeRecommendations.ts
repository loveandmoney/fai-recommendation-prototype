import { MAX_HOUSE_HISTORY_LENGTH } from '@/constants';
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

const VARIANCE_PADDING_COST_FACTOR = 0.2;
const VARIANCE_PADDING_STORIES = 0;
const VARIANCE_PADDING_BEDS = 1;
const VARIANCE_PADDING_BATHS = 1;
const VARIANCE_PADDING_LIVINGROOMS = 1;

function getFallbackHouses(excludeIds: Set<string> = new Set()): IHouse[] {
  const anchored = houses.filter(
    (house) => house.ranking === 'anchored' && !excludeIds.has(house.id)
  );

  const featured = houses.filter(
    (c) =>
      c.ranking === 'featured' &&
      !anchored.some((a) => a.id === c.id) &&
      !excludeIds.has(c.id)
  );

  const usedIds = new Set(
    [...anchored, ...featured].map((h) => h.id).concat([...excludeIds])
  );

  const random = houses
    .filter((h) => !usedIds.has(h.id))
    .sort(() => 0.5 - Math.random());

  return [...anchored, ...featured, ...random];
}

export function getPreferredCollection(
  viewHistory: IHouse[]
): TCollection | null {
  const counts: Record<TCollection, number> = {
    simplicity: 0,
    bridgewater: 0,
    elegance: 0,
  };

  for (const house of viewHistory) {
    counts[house.collection]++;
  }

  const max = Math.max(...Object.values(counts));
  const preferredCollectionCountThreshold = MAX_HOUSE_HISTORY_LENGTH - 1;

  if (max < preferredCollectionCountThreshold) return null;

  const topCollections = (Object.entries(counts) as [TCollection, number][])
    .filter(([, count]) => count === max)
    .map(([collection]) => collection);

  if (topCollections.length === 1) return topCollections[0];

  for (let i = viewHistory.length - 1; i >= 0; i--) {
    const c = viewHistory[i].collection;
    if (topCollections.includes(c)) return c;
  }

  return null;
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

export function getRecommendedHouses({
  viewed,
  entries = 4,
  matchingOnly = false,
}: {
  viewed: IHouse[];
  entries?: number;
  matchingOnly?: boolean;
}): IHouse[] {
  if (viewed.length === 0) {
    if (matchingOnly) return [];
    return getFallbackHouses().slice(0, entries);
  }

  const mostRecentId = viewed.at(-1)?.id;
  const variance = calculateVariance(viewed);
  const preferredCollection = getPreferredCollection(viewed);
  const viewedIds = new Set(viewed.map((v) => v.id));

  const anchored: IHouse[] = houses.filter(
    (h) =>
      h.ranking === 'anchored' && h.id !== mostRecentId && !viewedIds.has(h.id)
  );

  const matching: IHouse[] = houses.filter((house) => {
    if (
      house.ranking === 'anchored' ||
      house.id === mostRecentId ||
      viewedIds.has(house.id)
    ) {
      return false;
    }

    return properties.every((prop) => {
      const value = house[prop];
      const { min, max } = variance[prop];
      return value >= min && value <= max;
    });
  });

  const sorted = matching.sort((a, b) => {
    const aRank = a.ranking === 'featured' ? 1 : 0;
    const bRank = b.ranking === 'featured' ? 1 : 0;
    if (aRank !== bRank) return bRank - aRank;

    const aPref =
      preferredCollection && a.collection === preferredCollection ? 1 : 0;
    const bPref =
      preferredCollection && b.collection === preferredCollection ? 1 : 0;
    return bPref - aPref;
  });

  const recommended = [...anchored, ...sorted];

  if (matchingOnly || recommended.length >= entries) {
    return [...recommended].slice(0, entries);
  }

  const usedIds = new Set([...recommended, ...viewed].map((h) => h.id));
  const fallback = getFallbackHouses(usedIds);

  return [...recommended, ...fallback].slice(0, entries);
}
