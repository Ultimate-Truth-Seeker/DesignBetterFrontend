import { fetchBackend } from './fetch';

// Tipos compartidos
export type UserPreferences = {
  notifications?: boolean;
  darkMode?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  preferences?: UserPreferences;
};

export type Disenador = {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
};

export type EstadoPedido = 'pendiente' | 'en_proceso' | 'completado' | 'revision';

export type ArchivoAdjunto = {
  nombre: string;
  url: string;
  tipo: string;
  tamaño: number;
};

export type Feedback = {
  id: string;
  calificacion: number;
  comentario: string;
  fecha: string;
};

export type Pedido = {
  id: string;
  titulo: string;
  estado: EstadoPedido;
  fecha: string;
  fechaEntrega?: string;
  descripcion: string;
  disenador?: Disenador;
};

export type PedidoDetallado = Pedido & {
  historial: {
    fecha: string;
    estado: EstadoPedido;
    mensaje?: string;
  }[];
  archivos?: ArchivoAdjunto[];
  feedback?: Feedback;
};

// Funciones de dashboard
export async function fetchClientDashboard() {
  const response = await fetchBackend('/api/clientes/dashboard/', {
    cache: 'no-store',
  });
  return response.json() as Promise<{
    nombre: string;
    pedidosPendientes: number;
    pedidosEnProceso: number;
    ultimosPedidos: Pedido[];
  }>;
}

// Funciones de pedidos
export async function fetchPedidosCliente(estado?: string): Promise<Pedido[]> {
  const url = `/api/clientes/pedidos${estado ? `?estado=${estado}` : ''}`;
  const response = await fetchBackend(url, {
    cache: 'no-store',
  });
  return response.json();
}

export async function fetchPedidoDetalle(id: string): Promise<PedidoDetallado> {
  const response = await fetchBackend(`/api/clientes/pedidos/${id}`, {
    cache: 'no-store',
  });
  return response.json();
}

export async function createPedido(data: {
  titulo: string;
  descripcion: string;
  fechaEntrega?: string;
}) {
  return fetchBackend('/api/clientes/pedidos/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function solicitarRevision(pedidoId: string, mensaje: string) {
  return fetchBackend(`/api/clientes/pedidos/${pedidoId}/revision`, {
    method: 'POST',
    body: JSON.stringify({ mensaje }),
  });
}

// Funciones de feedback
export async function submitFeedback(data: {
  pedidoId: string;
  calificacion: number;
  comentario: string;
}) {
  return fetchBackend(`/api/clientes/pedidos/${data.pedidoId}/feedback`, {
    method: 'POST',
    body: JSON.stringify({
      calificacion: data.calificacion,
      comentario: data.comentario
    }),
  });
}

export async function getFeedback(pedidoId: string): Promise<Feedback | null> {
  const response = await fetchBackend(`/api/clientes/pedidos/${pedidoId}/feedback`);
  return response.status === 404 ? null : response.json();
}

// Funciones de perfil
export async function updateUserProfile(formData: FormData) {
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

// Exportaciones
export { fetchBackend };