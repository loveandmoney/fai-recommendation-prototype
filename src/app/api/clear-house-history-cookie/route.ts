import { HOUSE_HISTORY_COOKIE_NAME } from '@/constants';
import { NextResponse } from 'next/server';

export const POST = () => {
  const res = new NextResponse(JSON.stringify({ status: 200 }));

  res.cookies.set(HOUSE_HISTORY_COOKIE_NAME, '', {
    path: '/',
    httpOnly: true,
    maxAge: 0, // expire immediately
  });

  return res;
};
