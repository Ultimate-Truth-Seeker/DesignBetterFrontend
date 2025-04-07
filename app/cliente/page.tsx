import {PedidoStatusCards} from '@/components/clients/PedidoStatusCards';
import QuickActions from '@/components/clients/QuickActions';
import { fetchClientDashboard } from '@/lib/api/clientes';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

export default async function ClientDashboard() {
  // Fetch datos del dashboard (ej: últimos pedidos, estadísticas)
  const dashboardData = await fetchClientDashboard();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Hola, {dashboardData.nombre}</h1>
        <p className="text-gray-600 mt-2">
          Revisa el estado de tus pedidos y diseños en proceso
        </p>
      </header>

      <Suspense fallback={<LoadingSkeleton />}>
        <section>
          <h2 className="text-xl font-semibold mb-4">Resumen de Pedidos</h2>
          <PedidoStatusCards 
                      pendientes={dashboardData.pedidosPendientes}
                      enProceso={dashboardData.pedidosEnProceso} completados={0}          />
        </section>
      </Suspense>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Tus últimos diseños</h2>
          {/* Lista de diseños recientes */}
        </div>
        <div>
          <QuickActions />
        </div>
      </section>
    </div>
  );
}