import {
  CONTENT_HISTORY_COOKIE_NAME,
  MAX_VIEW_HISTORY_LENGTH,
} from '@/constants';
import { IContent } from '@/data/content';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { newContent } = (await req.json()) as { newContent: IContent };

  const cookieStore = await cookies();

  const raw = cookieStore.get(CONTENT_HISTORY_COOKIE_NAME)?.value || '';
  let history: IContent[] = [];

  try {
    history = JSON.parse(decodeURIComponent(raw));
  } catch {
    history = [];
  }

  if (history.length >= MAX_VIEW_HISTORY_LENGTH) {
    history = history.slice(-MAX_VIEW_HISTORY_LENGTH + 1);
  }

  history.push(newContent);

  const cookieValue = encodeURIComponent(JSON.stringify(history));

  const res = new NextResponse(JSON.stringify({ status: 200 }));
  res.cookies.set(CONTENT_HISTORY_COOKIE_NAME, cookieValue, {
    path: '/',
    httpOnly: true,
  });

  return res;
};
