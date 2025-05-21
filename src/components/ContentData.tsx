import { IContent } from '@/data/content';
import clsx from 'clsx';
import { Anchor, Star } from 'lucide-react';

export const ContentData = ({ content }: { content: IContent }) => {
  const { tags, text, title, ranking } = content;

  const anchored = ranking === 'anchored';
  const featured = ranking === 'featured';

  return (
    <div
      className={clsx(
        'border rounded-lg p-4 grid gap-3',
        featured && 'bg-yellow-200',
        anchored && 'bg-green-200'
      )}
    >
      <h2 className="font-bold">{title}</h2>

      <p>{text}</p>

      <div className="flex flex-wrap gap-2 items-center">
        {tags.map((tag) => (
          <span key={tag} className="bg-gray-200 rounded-md text-xs p-1">
            {tag}
          </span>
        ))}
      </div>

      <div>
        {anchored && (
          <div className="inline-flex gap-2 items-center bg-green-400 rounded-md text-xs p-1">
            <Anchor /> Anchored
          </div>
        )}

        {featured && (
          <div className="inline-flex gap-2 items-center bg-yellow-400 rounded-md text-xs p-1">
            <Star /> Featured
          </div>
        )}
      </div>
    </div>
  );
};
