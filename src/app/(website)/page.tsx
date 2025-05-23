import { ContentLink } from '@/components/ContentLink';
import { HouseLink } from '@/components/HouseLink';
import {
  CONTENT_HISTORY_COOKIE_NAME,
  HOUSE_HISTORY_COOKIE_NAME,
} from '@/constants';
import { IContent } from '@/data/content';
import { IHouse } from '@/data/houses';
import { getRecommendedContent } from '@/lib/contentRecommendations';
import { getRecommendedHouses } from '@/lib/homeRecommendations';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const cookieStore = await cookies();

  // Houses
  const rawHouseHistory =
    cookieStore.get(HOUSE_HISTORY_COOKIE_NAME)?.value || '';
  let houseHistory: IHouse[] = [];

  try {
    houseHistory = JSON.parse(decodeURIComponent(rawHouseHistory));
  } catch {}

  const recommendedHouses = getRecommendedHouses({
    viewed: houseHistory,
  });

  // Content
  const rawContentHistory =
    cookieStore.get(CONTENT_HISTORY_COOKIE_NAME)?.value || '';
  let contentHistory: IContent[] = [];

  try {
    contentHistory = JSON.parse(decodeURIComponent(rawContentHistory));
  } catch {}

  const recommendedContent = getRecommendedContent({
    history: contentHistory,
  });

  return (
    <div className="grid gap-10">
      <div className="grid gap-2">
        <h2 className="font-bold text-lg">Recommended Homes</h2>
        <div className="grid grid-cols-4 gap-4">
          {recommendedHouses.map((house) => (
            <HouseLink house={house} key={house.id} />
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <h2 className="font-bold text-lg">Recommended Content</h2>
        <div className="grid grid-cols-4 gap-4">
          {recommendedContent.map((content) => (
            <ContentLink content={content} key={content.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
