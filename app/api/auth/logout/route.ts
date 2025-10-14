// /app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // Borrar cookies (setear expiradas)
  res.cookies.set('access', '', { httpOnly: true, path: '/', maxAge: 0 });
  res.cookies.set('refresh', '', { httpOnly: true, path: '/', maxAge: 0 });

  return res;
}