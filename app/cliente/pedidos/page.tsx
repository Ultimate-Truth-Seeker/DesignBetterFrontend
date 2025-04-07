import { Suspense } from 'react';
import { fetchPedidosCliente } from '@/lib/api/clientes';
import { EmptyState } from '@/components/clients/EmptyState';
import { PedidoList } from '@/components/clients/PedidoList';
import { PedidoFilter } from '@/components/clients/PedidoFilter';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default async function PedidosPage({
  searchParams,
}: {
  searchParams?: { estado?: string };
}) {
  const estadoFiltro = searchParams?.estado || 'todos';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tus Pedidos</h1>
          <p className="text-muted-foreground">
            Revisa el estado y historial de tus pedidos
          </p>
        </div>
        <Button asChild>
          <Link href="/cliente/pedidos/nuevo">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nuevo pedido
          </Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar de filtros */}
        <aside className="lg:w-64">
          <PedidoFilter currentFilter={estadoFiltro} />
        </aside>

        {/* Contenido principal */}
        <main className="flex-1">
          <Suspense fallback={<PedidoList.Skeleton />}>
            <PedidoListWrapper estado={estadoFiltro} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

async function PedidoListWrapper({ estado }: { estado: string }) {
  const pedidos = await fetchPedidosCliente(estado);

  if (pedidos.length === 0) {
    return (
      <EmptyState
        title="No hay pedidos"
        description={`No encontramos pedidos ${estado !== 'todos' ? `con estado "${estado}"` : ''}`}
      />
    );
  }

  return <PedidoList pedidos={pedidos} />;
}