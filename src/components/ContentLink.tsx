'use client';

import Link from 'next/link';
import { IContent } from '@/data/content';
import { trackContentView } from '@/lib/contentRecommendations';
import { ContentData } from './ContentData';

export const ContentLink = ({ content }: { content: IContent }) => {
  const handleClick = () => {
    trackContentView(content);
  };

  return (
    <Link onClick={handleClick} href={`/content/${content.id}`}>
      <ContentData content={content} />
    </Link>
  );
};
