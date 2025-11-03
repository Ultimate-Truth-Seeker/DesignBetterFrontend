'use client';

import { useState, useEffect } from 'react';
import { PedidoDetallado } from '@/lib/types';
import { fetchPedidoDetallado } from '@/lib/api/disenadores';
import TimelinePage from './timeline'; 
import { PaymentMethodViewer } from '@/components/clients/PaymentMethodViewer';
import { useParams } from "next/navigation";

export default function PedidoDisenadorPage() {
  const params = useParams()
  const pedidoId = Number(params.id);
  const [pedido, setPedido] = useState<PedidoDetallado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Cargando pedido...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!pedido) return <p>No se encontró el pedido.</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <h1 className="text-2xl font-bold">Pedido #{pedido.id}</h1>
      <p className="text-gray-600">
        Estado actual: <span className="font-semibold">{pedido.estado}</span>
      </p>

      {/* Timeline del pedido */}
      <div className="bg-white p-6 rounded-lg border">
        <TimelinePage params={{id: pedidoId.toString()}} />
      </div>

      {/* Método de pago */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
        <PaymentMethodViewer metodoPago={pedido.metodopago} />
      </div>
    </div>
  );
}
