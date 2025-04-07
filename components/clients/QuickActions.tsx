'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Acciones rápidas</h3>
      <Button 
        onClick={() => router.push('/cliente/pedidos/nuevo')}
        variant="primary"
      >
        Nuevo pedido
      </Button>
      <Button 
        onClick={() => router.push('/cliente/ayuda')}
        variant="outline"
      >
        Solicitar ayuda
      </Button>
    </div>
  );
}