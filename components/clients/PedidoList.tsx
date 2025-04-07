import Link from 'next/link';
import { StatusBadge } from './StatusBadge';
import type { Pedido } from '@/lib/api/clientes';

interface PedidoListProps {
  pedidos: Pedido[];
}

export function PedidoList({ pedidos }: PedidoListProps) {
  return (
    <div className="grid gap-4">
      {pedidos.map((pedido) => (
        <Link
          key={pedido.id}
          href={`/cliente/pedidos/${pedido.id}`}
          className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{pedido.titulo}</h3>
              <p className="text-sm text-gray-500">
                {new Date(pedido.fecha).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              {pedido.disenador && (
                <p className="text-sm text-gray-500 mt-1">
                  Diseñador: <span className="text-gray-700">{pedido.disenador.nombre}</span>
                </p>
              )}
            </div>
            <StatusBadge estado={pedido.estado} />
          </div>
        </Link>
      ))}
    </div>
  );
}

// Componente de skeleton loading
PedidoList.Skeleton = function SkeletonList() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="h-20 bg-gray-100 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
};