// lib/api/disenadores.ts

import { PedidoDetallado, EstadoPedido } from '@/lib/types';

export async function fetchPedidoDetallado(id: number): Promise<PedidoDetallado> {
  const res = await fetch(`/api/disenadores/pedidos/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al cargar pedido');
  return res.json();
}

export async function updatePedidoEstado(
  id: number,
  estado: EstadoPedido,
  mensaje?: string
): Promise<PedidoDetallado> {
  const res = await fetch(`/api/disenadores/pedidos/${id}/estado`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado, mensaje }),
  });
  if (!res.ok) throw new Error('Error al actualizar estado');
  return res.json();
}
