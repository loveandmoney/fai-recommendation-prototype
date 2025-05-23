import { ContentLink } from '@/components/ContentLink';
import { CONTENT_HISTORY_COOKIE_NAME } from '@/constants';
import { IContent } from '@/data/content';
import { getRecommendedContent } from '@/lib/contentRecommendations';
import { cookies } from 'next/headers';

export default async function RecommendationsPage() {
  const cookieStore = await cookies();

  const raw = cookieStore.get(CONTENT_HISTORY_COOKIE_NAME)?.value || '';
  let history: IContent[] = [];

  try {
    history = JSON.parse(decodeURIComponent(raw));
  } catch {}

  const recommendations = getRecommendedContent({ history, entries: 50 });

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Recommendations</h1>
      <ul className="grid grid-cols-4 gap-4">
        {recommendations.map((content) => (
          <li key={content.id}>
            <ContentLink content={content} />
          </li>
        ))}
      </ul>
    </>
  );
}
