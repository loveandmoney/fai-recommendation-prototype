import { houses, IHouse } from '@/data/houses';

const LS_KEY = 'user_viewed_houses';

export function getViewedHouses(): IHouse[] {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
}

export function trackHouseView(house: IHouse) {
  const current = getViewedHouses();
  const updated = [...current.slice(-4), house]; // Keep last 5
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
}

export function calculateVariance(houses: IHouse[]) {
  const fields = ['cost', 'beds', 'bathrooms', 'livingRooms'] as const;

  const minMax = fields.reduce(
    (acc, key) => {
      const values = houses.map((h) => h[key]);
      acc[key] = {
        min: Math.min(...values),
        max: Math.max(...values),
      };
      return acc;
    },
    {} as Record<(typeof fields)[number], { min: number; max: number }>
  );

  return minMax;
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
