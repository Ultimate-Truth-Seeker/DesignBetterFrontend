'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const FILTER_OPTIONS = [
  { value: 'todos', label: 'Todos los pedidos' },
  { value: 'pendiente', label: 'Pendientes' },
  { value: 'en_proceso', label: 'En proceso' },
  { value: 'completado', label: 'Completados' },
] as const;

export function PedidoFilter({ 
  currentFilter 
}: { 
  currentFilter: string 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('estado', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-2 p-4 bg-white rounded-lg border">
      <h3 className="font-medium text-gray-900 mb-3">Filtrar por</h3>
      <div className="space-y-2">
        {FILTER_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={currentFilter === option.value ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${currentFilter === option.value ? 'bg-gray-100' : ''}`}
            onClick={() => handleFilterChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}