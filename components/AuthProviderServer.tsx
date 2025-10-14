'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/auth-types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: async () => {},
});

type Props = {
  children: React.ReactNode;
  /** Hidratación SSR → evita flicker (puedes pasarlo desde layout) */
  initialUser?: User | null;
};

export function AuthProvider({ children, initialUser = null }: Props) {
  const [user, setUser] = useState<User | null>(initialUser);
  const isAuthenticated = !!user;
  const router = useRouter();

  // Revalidar sesión en el cliente (por si la cookie cambió)
  useEffect(() => {
    // Si ya vino de SSR, puedes opcionalmente omitir esta primera carga
    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch('/api/me', { signal: controller.signal, cache: 'no-store' });
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user ?? null);
      } catch {
        // ignore
      }
    };
    if (initialUser === null) run(); // revalida solo si no vino hidradata
    return () => controller.abort();
  }, [initialUser]);

  const login: AuthContextType['login'] = async (credentials) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Login failed');
    }

    const { user } = await res.json();
    setUser(user);

    // Redirección por rol
    const rol = user?.rol;
    if (rol === 'admin') router.push('/dashboard/admin');
    else if (rol === 'cliente') router.push('/dashboard/cliente');
    else if (rol === 'diseñador') router.push('/dashboard/disenadores');
    else router.push('/welcome');
  };

  const logout: AuthContextType['logout'] = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}