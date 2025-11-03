// /app/api/me/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

export async function GET(req: NextRequest) {
  // Forward de cookies al backend (si tu backend lee la cookie 'access')
  const cookie = req.headers.get('cookie') || '';

  const res = await fetch(`${BACKEND_URL}/me`, {
    headers: {
      cookie, // el backend verá 'access' y/o 'refresh'
      'Accept': 'application/json',
    },
    // Importante si tu backend está en mismo dominio/subdominio con credenciales
    // credentials: 'include' no aplica en RequestHandler; arriba pasamos cookies manualmente
  });

  if (!res.ok) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await res.json();
  return NextResponse.json({ user });
}