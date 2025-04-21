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

import { jwtDecode } from 'jwt-decode'

export interface DecodedToken {
  user_id: number
  email: string
  rol: 'admin' | 'cliente' | 'disenador' // o lo que tengas
  nombre: string
  exp: number
  iat: number
}

export function decodeAccessToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token)
  } catch (error) {
    console.error('Error decodificando el token:', error)
    return null
  }
}
