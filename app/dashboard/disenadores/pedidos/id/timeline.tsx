'use client';

import { useState, useEffect } from 'react';
import { PedidoDetallado, EstadoPedido } from '@/lib/types';
import { fetchPedidoDetallado, updatePedidoEstado } from '@/lib/api/disenadores';
import { TrackingTimeline } from '@/components/clients/TrackingTimeline';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function TimelinePage({
  params,
}: {
  params: { id: string };
}) {
  const pedidoId = Number(params.id);
  const [pedido, setPedido] = useState<PedidoDetallado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nuevoEstado, setNuevoEstado] = useState<EstadoPedido | ''>('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPedidoDetallado(pedidoId);
        if (!cancel) setPedido(data);
      } catch (e: any) {
        if (!cancel) setError(e?.message ?? 'Error cargando pedido');
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [pedidoId]);

  async function handleEstadoChange() {
    if (!nuevoEstado) return;
    try {
      const actualizado = await updatePedidoEstado(pedidoId, nuevoEstado, mensaje);
      setPedido(actualizado); // refrescar con datos actualizados
      setNuevoEstado('');
      setMensaje('');
    } catch (e: any) {
      alert(e?.message ?? 'Error actualizando estado');
    }
  }

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!pedido) return <p>No se encontró el pedido.</p>;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-bold">Pedido #{pedido.id}</h2>
      <p className="text-gray-600">Estado actual: <span className="font-semibold">{pedido.estado}</span></p>

      <TrackingTimeline historial={pedido.historial} />

      <div className="space-y-4 border-t pt-4">
        <h3 className="font-semibold">Actualizar estado</h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Nuevo estado</label>
          <select
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value as EstadoPedido)}
            className="w-full border rounded-md p-2"
          >
            <option value="">Selecciona un estado...</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En proceso</option>
            <option value="revision">En revisión</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Mensaje (opcional)</label>
          <Textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Ejemplo: Diseño enviado para revisión"
            rows={3}
          />
        </div>

        <Button onClick={handleEstadoChange} disabled={!nuevoEstado}>
          Guardar cambio
        </Button>
      </div>
    </div>
  );
}
