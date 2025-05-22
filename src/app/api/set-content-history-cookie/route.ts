import { CONTENT_HISTORY_COOKIE_NAME } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { history } = await req.json();

  const cookieValue = JSON.stringify(history);

  const res = new NextResponse(JSON.stringify({ status: 200 }));
  res.cookies.set(CONTENT_HISTORY_COOKIE_NAME, cookieValue, {
    path: '/',
    httpOnly: true,
  });

  return res;
};
