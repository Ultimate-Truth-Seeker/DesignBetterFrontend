import { Button } from '@/components/ui/Button';
import { fetchPedidoDetalle } from '@/lib/api/clientes';
import { validateRole } from '@/lib/auth';
import { StatusBadge } from '@/components/clients/StatusBadge';
import Link from 'next/link';

export default async function PedidoDetailPage({
  params
}: {
  params: { id: string }
}) {
  await validateRole('CLIENTE');
  const pedido = await fetchPedidoDetalle(params.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{pedido.titulo}</h1>
          <p className="text-gray-500">
            Creado el: {new Date(pedido.fecha).toLocaleDateString('es-ES')}
          </p>
        </div>
        <StatusBadge estado={pedido.estado} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Detalles</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p>{pedido.descripcion}</p>
          </div>

          {pedido.disenador && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Diseñador asignado</h3>
              <p>{pedido.disenador.nombre}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Acciones</h2>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href={`/cliente/pedidos/${params.id}/feedback`}>
                Dejar Feedback
              </Link>
            </Button>
            <Button variant="outline" className="w-full">
              Solicitar Revisión
            </Button>
          </div>

{pedido.archivos && pedido.archivos.length > 0 && (
  <div className="mt-6">
    <h3 className="font-medium mb-2">Archivos adjuntos</h3>
    <div className="space-y-2">
      {pedido.archivos.map(archivo => (
        <a 
          key={archivo.url} 
          href={archivo.url}
          className="flex items-center text-blue-600 hover:underline"
          download
        >
          {archivo.nombre}
        </a>
      ))}
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}