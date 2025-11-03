'use client';
import { Badge } from '../ui/badge';

type Props = {
  pendientes: number;
  enProceso: number;
  completados: number;
};

export function PedidoStatusCards({ 
  pendientes, 
  enProceso, 
  completados 
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium">Pendientes</h3>
        <div className="flex items-center mt-2">
          <Badge variant="yellow" className="mr-2" />
          <span className="text-2xl font-bold">{pendientes}</span>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium">En proceso</h3>
        <div className="flex items-center mt-2">
          <Badge variant="blue" className="mr-2" />
          <span className="text-2xl font-bold">{enProceso}</span>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium">Completados</h3>
        <div className="flex items-center mt-2">
          <Badge variant="green" className="mr-2" />
          <span className="text-2xl font-bold">{completados}</span>
        </div>
      </div>
    </div>
  );
}