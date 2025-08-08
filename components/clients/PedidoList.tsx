// components/clients/PedidoList.tsx
import Link from 'next/link';
import { StatusBadge } from './StatusBadge';
import type { PedidoAPI } from '@/lib/api/clientes.client';

interface PedidoListProps {
  pedidos: PedidoAPI[];
}

export function PedidoList({ pedidos }: PedidoListProps) {
  return (
    <div className="grid gap-4">
      {pedidos.map((p) => {
        const titulo = p.notas?.trim() || `Pedido #${p.id}`;
        const fecha = new Date(p.fecha_creacion);
        const disenadorText =
          p.disenador == null ? 'Sin asignar' : `ID ${p.disenador}`;

        return (
          <Link
            key={p.id}
            href={`/dashboard/cliente/pedidos/${p.id}`}
            className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{titulo}</h3>
                <p className="text-sm text-gray-500">
                  {Number.isNaN(fecha.getTime())
                    ? 'Fecha no disponible'
                    : fecha.toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Diseñador: <span className="text-gray-700">{disenadorText}</span>
                </p>
              </div>
              <StatusBadge estado={p.estado} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// Skeleton se queda igual
PedidoList.Skeleton = function SkeletonList() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );
};