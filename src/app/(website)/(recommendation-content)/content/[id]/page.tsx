import ContentContent from './content';
import { content as contentData } from '@/data/content';

export interface IPageProps {
  params: {
    id: string;
  };
}

export default function ContentPage({ params }: IPageProps) {
  const idNumber = params.id;

  const content = contentData.find((c) => c.id === idNumber);

  if (!content) {
    return <div>Content not found</div>;
  }

  return <ContentContent content={content} />;
}

export async function generateStaticParams() {
  return contentData.map((content) => ({
    id: content.id,
  }));
}
