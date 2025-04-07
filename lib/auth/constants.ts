export type UserRole = 'GUEST' | 'CLIENTE' | 'DISENADOR' | 'ADMIN';

// Define jerarquía de roles (a mayor número, más privilegios)
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  GUEST: 0,
  CLIENTE: 1,
  DISENADOR: 2,
  ADMIN: 3
};

export const PROTECTED_ROUTES: Record<UserRole, string[]> = {
    CLIENTE: ['/cliente', '/pedidos'],
    ADMIN: ['/admin', '/configuracion'],
    GUEST: [],
    DISENADOR: []
};