'use server'; // Necesario para Server Actions en Next.js 14+

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { fetchBackend } from '../api/clientes';

// Esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export async function loginUser(prevState: any, formData: FormData) {
  try {
    // Validar datos del formulario
    const validatedData = loginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Llamar al backend Django
    const response = await fetchBackend('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) throw new Error('Credenciales incorrectas');

    const { token, user } = await response.json();

    // Guardar token en cookies (HTTP Only para seguridad)
    (await
          // Guardar token en cookies (HTTP Only para seguridad)
          cookies()).set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: '/',
    });

    // Redirigir según rol
    switch (user.rol) {
      case 'CLIENTE':
        return redirect('/cliente');
      case 'DISENADOR':
        return redirect('/disenador');
      case 'ADMIN':
        return redirect('/admin');
      default:
        throw new Error('Rol no válido');
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

export async function logoutUser() {
  // Eliminar cookie de sesión
  (await
        // Eliminar cookie de sesión
        cookies()).delete('session_token');
  redirect('/login');
}

export async function getSessionUser() {
  const token = (await cookies()).get('session_token')?.value;
  if (!token) return null;

  try {
    const response = await fetchBackend('/api/auth/me/', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
}