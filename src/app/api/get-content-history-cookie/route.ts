import { CONTENT_HISTORY_COOKIE_NAME } from '@/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const cookieStore = await cookies();

  const raw = cookieStore.get(CONTENT_HISTORY_COOKIE_NAME)?.value || '';
  let history = [];

  try {
    history = JSON.parse(decodeURIComponent(raw));
  } catch {
    history = [];
  }

  return NextResponse.json({ history });
};
