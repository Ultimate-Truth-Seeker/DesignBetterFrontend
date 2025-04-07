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

// --- Funciones para el lado del cliente ---

/**
 * Guarda los tokens de acceso y refresco en localStorage
 * @param access Token de acceso
 * @param refresh Token de refresco
 */
export function saveTokens(access: string, refresh: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  }
}

/**
 * Obtiene el token de acceso desde localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("accessToken");
  }
  return null;
}

/**
 * Elimina los tokens de acceso y refresco de localStorage
 */
export function clearTokens() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}