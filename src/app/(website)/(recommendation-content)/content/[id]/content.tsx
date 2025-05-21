import { ContentData } from '@/components/ContentData';
import { IContent } from '@/data/content';

export default function ContentContent({ content }: { content: IContent }) {
  return <ContentData content={content} />;
}
