import { ContentLink } from '@/components/ContentLink';
import { CONTENT_HISTORY_COOKIE_NAME } from '@/constants';
import { IContent } from '@/data/content';
import { cookies } from 'next/headers';

export default async function RecommendationsPage() {
  const cookieStore = await cookies();
  const viewHistoryRaw = cookieStore.get(CONTENT_HISTORY_COOKIE_NAME)?.value;
  const viewHistory: IContent[] = viewHistoryRaw
    ? JSON.parse(decodeURIComponent(viewHistoryRaw))
    : [];

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Recommendations</h1>
      <ul className="grid grid-cols-4 gap-4">
        {viewHistory.map((content) => (
          <li key={content.id}>
            <ContentLink content={content} />
          </li>
        ))}
      </ul>
    </>
  );
}
