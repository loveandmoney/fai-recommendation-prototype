import { ContentLink } from '@/components/ContentLink';
import { content } from '@/data/content';

export default function AllHousesPage() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">All Houses</h1>
      <ul className="grid grid-cols-4 gap-4">
        {content.map((content) => (
          <li key={content.id}>
            <ContentLink content={content} />
          </li>
        ))}
      </ul>
    </>
  );
}
