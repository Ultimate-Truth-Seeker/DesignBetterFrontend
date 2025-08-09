// @/lib/api/clientes.ts
import { getAccessToken } from '../auth-client';
import { fetchBackend } from './fetch';
import type {
  UserPreferences,
  User,
  Disenador,
  EstadoPedido,
  ArchivoAdjunto,
  Feedback,
  Pedido,
  PedidoDetallado,
  DashboardCliente,
  PedidoTracking
} from '@/lib/types';

export type PedidoAPI = {
  id: number;
  plantilla: number;
  color: string;
  ajustes: any;
  notas: string;
  estado: string;
  pago_realizado: boolean;
  usuario: number;
  disenador: number | null;
  fecha_creacion: string;
};
// Funciones de dashboard
export async function fetchClientDashboard() {
  //try {
    const response = await fetchBackend('/orders/pedidos/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`

    },});
    if (!response.ok) {
      console.log('hubo error ' + response.text)
    }
    return response.json() as Promise<DashboardCliente>;
  //} //catch {
    //return {
      //nombre: '',
      //pedidosPendientes: 0,
      //pedidosEnProceso: 0,
      //ultimosPedidos: [],
    //};
  //}
}

// Funciones de pedidos
export async function fetchPedidosCliente(estado?: EstadoPedido) {
  try {
    const url = `/orders/pedidos/`;
    const response = await fetchBackend(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`

    },
    cache: 'no-store'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json() as Promise<PedidoAPI[]>;
  } catch {
    return []
  }
}

export async function fetchPedidoDetalle(id: string): Promise<PedidoDetallado> {
  const response = await fetchBackend(`/api/clientes/pedidos/${id}`, {
    cache: 'no-store',
  });
  return response.json();
}

export interface NuevoPedidoPayload {
  plantilla: number;
  color: string;
  ajustes: string;//Record<string, any>;
  notas: string;
}

export async function createPedido(data: NuevoPedidoPayload): Promise<Pedido> {
  const response = await fetchBackend('/orders/pedidos/crear/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`

    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // opcionalmente parsea un mensaje de error
    const errText = await response.text();
    throw new Error(`Error ${response.status}: ${errText}`);
  }

  return response.json();
}

export type Plantilla = {
  id: number;
  nombre: string;
  descripcion: string;
  tipo_ropa: string;
  tipo_cuerpo: string;
};

export async function getPlantillas(): Promise<Plantilla[]> {
  //const res = await fetch(`${base}/api/plantillas/`, { cache: 'no-store' });
  const res = await fetchBackend('/auth/plantillas/', )
  if (!res.ok) throw new Error(`Error cargando plantillas: ${res.status}`);
  return res.json();
}

export async function fetchPedidoTrackingClient(pedidoId: number) {
  const res = await fetchBackend(`/orders/api/pedidos/${pedidoId}/tracking`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`

    },
  }
  )
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json() as Promise<PedidoTracking>;
}

export async function solicitarRevision(pedidoId: string, mensaje: string): Promise<void> {
  await fetchBackend(`/api/clientes/pedidos/${pedidoId}/revision`, {
    method: 'POST',
    body: JSON.stringify({ mensaje }),
  });
}

// Funciones de feedback
export async function submitFeedback(data: {
  pedidoId: string;
  calificacion: number;
  comentario: string;
}): Promise<Feedback> {
  const response = await fetchBackend(`/api/clientes/pedidos/${data.pedidoId}/feedback`, {
    method: 'POST',
    body: JSON.stringify({
      calificacion: data.calificacion,
      comentario: data.comentario
    }),
  });
  return response.json();
}

export async function getFeedback(pedidoId: string): Promise<Feedback | null> {
  const response = await fetchBackend(`/api/clientes/pedidos/${pedidoId}/feedback`);
  return response.status === 404 ? null : response.json();
}

// Funciones de perfil
export async function updateUserProfile(formData: FormData): Promise<User> {
  const response = await fetchBackend('/api/clientes/configuracion', {
    method: 'PUT',
    body: JSON.stringify({
      name: formData.get('fullName'),
      email: formData.get('email'),
      preferences: {
        notifications: formData.get('notifications') === 'on',
        darkMode: formData.get('darkMode') === 'on',
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export { fetchBackend };

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchPedidoTracking(
  id: number | string
): Promise<PedidoDetallado> {
  const res = await fetch(`${API_BASE}/api/pedidos/${id}/tracking/`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Error al obtener tracking: ${res.status}`);
  }
  return res.json();
}