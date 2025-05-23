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

      <div className="grid gap-6 grid-cols-2">
        <div>
          <h2 className="font-bold text-lg">House Recommendation Logic</h2>
          <ol>
            <li>
              <strong>If the user hasn&apos;t viewed any houses:</strong>
              <ul>
                <li>Show anchored houses first</li>
                <li>Then show featured houses</li>
                <li>Then show random houses</li>
              </ul>
            </li>
            <li>
              <strong>If the user has viewed houses:</strong>
              <ul>
                <li>Track &lt;3&gt; most recently viewed houses</li>
                <li>
                  Calculate the range for price, beds, baths, etc. from the view
                  history
                </li>
                <li>
                  Add padding as configured to increase the range slightly
                </li>
                <li>
                  Find houses that match this range and haven&apos;t been viewed
                  yet
                </li>
                <li>
                  Always anchored houses first, then matching featured results,
                  then all other results
                </li>
                <li>Fill with randpm options if not enough are found</li>
              </ul>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-lg">Content Recommendation Logic</h2>
          <ol>
            <li>
              <strong>If the user hasn&apos;t viewed any content:</strong>
              <ul>
                <li>Show anchored content first</li>
                <li>Then show featured content</li>
                <li>Then show random content</li>
              </ul>
            </li>
            <li>
              <strong>If the user has viewed content:</strong>
              <ul>
                <li>Track &lt;2&gt; most recently viewed content</li>
                <li>Exclude any content they&apos;ve already seen</li>
                <li>Score the rest based on shared tags with viewed items</li>
                <li>
                  Always show anchored items, the filtered featured items, then
                  other results by tag match score
                </li>
                <li>Pad with fallback content if the list is too short</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
