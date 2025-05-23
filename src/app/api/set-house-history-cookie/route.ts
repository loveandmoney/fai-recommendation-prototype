import {
  HOUSE_HISTORY_COOKIE_NAME,
  MAX_HOUSE_HISTORY_LENGTH,
} from '@/constants';
import { IHouse } from '@/data/houses';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { newHouse } = (await req.json()) as { newHouse: IHouse };

  const cookieStore = await cookies();

  const raw = cookieStore.get(HOUSE_HISTORY_COOKIE_NAME)?.value || '';
  let history: IHouse[] = [];

  try {
    history = JSON.parse(decodeURIComponent(raw));
  } catch {
    history = [];
  }

  if (history.at(-1)?.id === newHouse.id) {
    return new NextResponse(JSON.stringify({ status: 200 }));
  }

  if (history.length >= MAX_HOUSE_HISTORY_LENGTH) {
    history = history.slice(-MAX_HOUSE_HISTORY_LENGTH + 1);
  }

  history.push(newHouse);

  const cookieValue = encodeURIComponent(JSON.stringify(history));

  const res = new NextResponse(JSON.stringify({ status: 200 }));
  res.cookies.set(HOUSE_HISTORY_COOKIE_NAME, cookieValue, {
    path: '/',
    httpOnly: true,
  });

  return res;
};
