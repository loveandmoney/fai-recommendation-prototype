'use client';

import Link from 'next/link';
import { IContent } from '@/data/content';
import { ContentData } from './ContentData';
import { apiService } from '@/lib/apiService';

export const ContentLink = ({ content }: { content: IContent }) => {
  const handleClick = async () => {
    try {
      await apiService.setContentHistoryCookie({ newContent: content });
    } catch (error) {
      console.error('Error tracking content view:', error);
    }
  };

  return (
    <Link onClick={handleClick} href={`/content/${content.id}`}>
      <ContentData content={content} />
    </Link>
  );
};
