// lib/auth-store.ts
'use client'

import { decodeAccessToken, getAccessToken as rawGet, saveTokens as rawSave, clearTokens as rawClear } from '@/lib/auth-client'
import { useSyncExternalStore } from 'react'

type User = ReturnType<typeof decodeAccessToken> | null

// --- estado interno + suscriptores ---
let currentUser: User = readUser()
const listeners = new Set<() => void>()

function readUser(): User {
  const t = rawGet()
  return t ? decodeAccessToken(t) : null
}

function notify() {
  currentUser = readUser()
  for (const l of listeners) l()
}

// --- API pública del store ---
export function getUserSnapshot(): User {
  return currentUser
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Exponer helpers que además notifiquen:
export function saveTokens(access: string, refresh?: string) {
  rawSave(access, refresh)
  notify()
  // también propaga entre pestañas:
  try { localStorage.setItem('__auth_ping__', String(Date.now())) } catch {}
}

export function clearTokens() {
  rawClear()
  notify()
  try { localStorage.setItem('__auth_ping__', String(Date.now())) } catch {}
}

// Mantener sincronía entre pestañas:
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === '__auth_ping__') notify()
  })
}

// Hook reactivo para usar en componentes:
export function useUser(): User {
  return useSyncExternalStore(
    subscribe,
    getUserSnapshot,
    getUserSnapshot // para SSR fallback
  )
}