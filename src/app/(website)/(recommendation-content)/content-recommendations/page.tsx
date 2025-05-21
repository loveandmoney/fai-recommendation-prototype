import { ContentLink } from '@/components/ContentLink';
import { content } from '@/data/content';
import { apiService } from '@/lib/apiService';

export default async function RecommendationsPage() {
  const recommendations = await apiService.getRecommendedContent({
    contentHistory: [content[3]],
  });

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
