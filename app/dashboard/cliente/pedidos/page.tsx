'use client'
import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchPedidosCliente, PedidoAPI } from '@/lib/api/clientes';
import { EmptyState } from '@/components/clients/EmptyState';
import { PedidoList } from '@/components/clients/PedidoList';
import { PedidoFilter } from '@/components/clients/PedidoFilter';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function PedidosPage() {
  const searchParams = useSearchParams();
  const estadoFiltro = (searchParams.get('estado') ?? 'todos').toLowerCase();
  
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
          <Link href="/dashboard/cliente/pedidos/nuevo">
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

function PedidoListWrapper({ estado }: { estado: string }) {
  const [pedidos, setPedidos] = useState<PedidoAPI[]>();
  useEffect(() => {
        (async () => {
          try {
            const data = await fetchPedidosCliente();
            setPedidos(data);
            
          } catch (e:any) {
            console.log(e.message ?? 'Error cargando plantillas');
          } 
        })();
      }, []);
  const pedidosFiltrados = useMemo(() => {
    if (estado === 'todos') return pedidos;
    return pedidos?.filter((p: { estado: string; }) => p.estado?.toLowerCase() === estado);
  }, [pedidos, estado]);
  if (pedidosFiltrados?.length === 0) {
    return (
      <EmptyState
        title="No hay pedidos"
        description={`No encontramos pedidos ${estado !== 'todos' ? `con estado "${estado}"` : ''}`}
      />
    );
  }

  return <PedidoList pedidos={pedidosFiltrados? pedidosFiltrados : []} />;
}