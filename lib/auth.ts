import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchBackend } from './api/fetch';

// --- Funciones para el lado del servidor (Next.js) ---

/**
 * Valida si el usuario tiene el rol requerido
 * @param role Rol requerido ('CLIENTE' | 'ADMIN' | etc.)
 */
export async function validateRole(role: string) {
  const sessionCookie = (await cookies()).get('session')?.value;
  
  const user = await fetchBackend('/api/auth/verify', {
    headers: { 
      Cookie: `session=${sessionCookie}` 
    },
  }).then(res => res.json())
    .catch(() => null);

  if (!user || user.role !== role) {
    redirect('/login');
  }
}

/**
 * Obtiene el usuario actual (para uso en componentes del servidor)
 */
export async function getCurrentUser() {
  const sessionCookie = (await cookies()).get('session')?.value;
  return fetchBackend('/api/auth/me', {
    headers: { 
      Cookie: `session=${sessionCookie}` 
    },
  }).then(res => res.json());
}

