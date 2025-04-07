import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  showAction?: boolean;
}

export function EmptyState({ 
  title, 
  description,
  showAction = true 
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto max-w-md">
        <h3 className="font-medium text-gray-900 text-lg mb-2">{title}</h3>
        <p className="text-gray-500 mb-6">{description}</p>
        
        {showAction && (
          <Button asChild>
            <Link href="/cliente/pedidos/nuevo">
              Crear nuevo pedido
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}