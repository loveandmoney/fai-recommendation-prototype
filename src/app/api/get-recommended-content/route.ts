import { IContent } from '@/data/content';
import { getRecommendedContent } from '@/lib/contentRecommendations';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const origin = req.headers.get('origin') || 'null';

  const headers = {
    'Access-Control-Allow-Origin': origin === 'null' ? 'null' : origin,
  };

  const { contentHistory } = (await req.json()) as {
    contentHistory: IContent[];
  };

  const recommendedContent = getRecommendedContent({ viewed: contentHistory });

  return NextResponse.json({ recommendedContent }, { status: 200, headers });
};
