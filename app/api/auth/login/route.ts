// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json(); // { email, password } o lo que uses
  const res = await fetch(${BACKEND_URL}/auth/login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // no mandes credenciales aquí, es login
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data?.error || 'Login failed' }, { status: res.status });
  }

  const { access, refresh, user } = data; // ajusta a tu backend

  const response = NextResponse.json({ user });

  // Setea cookies HTTP-only:
  const isProd = process.env.NODE_ENV === 'production';
  if (access) {
    response.cookies.set('access', access, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 15, // 15 min
    });
  }
  if (refresh) {
    response.cookies.set('refresh', refresh, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });
  }

  return response;
}