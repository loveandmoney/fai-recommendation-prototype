import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const origin = req.headers.get('origin') || 'null';

  const headers = {
    'Access-Control-Allow-Origin': origin === 'null' ? 'null' : origin,
  };

  const { userName } = await req.json();

  return NextResponse.json(
    { message: `Hello ${userName}` },
    { status: 200, headers }
  );
};
