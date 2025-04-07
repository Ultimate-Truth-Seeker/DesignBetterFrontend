import { cn } from '@/lib/utils';

type EstadoPedido = 'pendiente' | 'en_proceso' | 'completado';

interface StatusBadgeProps {
  estado: EstadoPedido;
  className?: string;
}

export function StatusBadge({ estado, className }: StatusBadgeProps) {
  // Configuración de estilos para cada estado
  const variants = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    en_proceso: 'bg-blue-100 text-blue-800',
    completado: 'bg-green-100 text-green-800'
  };

  // Texto a mostrar para cada estado
  const labels = {
    pendiente: 'Pendiente',
    en_proceso: 'En proceso',
    completado: 'Completado'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[estado],
        className
      )}
    >
      {labels[estado]}
    </span>
  );
}