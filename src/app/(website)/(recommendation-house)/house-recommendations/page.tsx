import { HouseLink } from '@/components/HouseLink';
import { HOUSE_HISTORY_COOKIE_NAME } from '@/constants';
import { IHouse } from '@/data/houses';
import { getRecommendedHouses } from '@/lib/homeRecommendations';
import { cookies } from 'next/headers';

export default async function RecommendationsPage() {
  const cookieStore = await cookies();

  const raw = cookieStore.get(HOUSE_HISTORY_COOKIE_NAME)?.value || '';
  let viewed: IHouse[] = [];

  try {
    viewed = JSON.parse(decodeURIComponent(raw));
  } catch {}

  const recommendations = getRecommendedHouses({
    viewed,
    entries: 50,
    matchingOnly: true,
  });

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Recommendations</h1>
      <ul className="grid grid-cols-4 gap-4">
        {recommendations.map((house) => (
          <li key={house.id}>
            <HouseLink house={house} />
          </li>
        ))}
      </ul>
    </>
  );
}
