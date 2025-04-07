import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserRole, ROLE_HIERARCHY } from './constants';

/**
 * Valida si el usuario tiene el rol requerido o superior
 * @param requiredRole Rol mínimo requerido
 * @param redirectPath Ruta a redirigir si falla (opcional)
 */
export async function validateRole(
  requiredRole: UserRole,
  redirectPath: string = '/login'
) {
  const session = await getSession();

  if (!session?.user || !hasMinimumRole(session.user.role, requiredRole)) {
    redirect(redirectPath);
  }
}

/**
 * Verifica jerarquía de roles
 */
function hasMinimumRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Obtiene la sesión del usuario desde cookies/token
 */
async function getSession() {
  const sessionCookie = (await cookies()).get('session')?.value;
  
  // Ejemplo: Verificar sesión con backend
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      headers: { 
        Cookie: `session=${sessionCookie}` 
      },
    });
    return response.json() as Promise<{ user: { role: UserRole } }>;
  } catch (error) {
    return null;
  }
}