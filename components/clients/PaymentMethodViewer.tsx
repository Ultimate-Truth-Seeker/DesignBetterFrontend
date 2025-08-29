'use client';

import { MetodoPago } from '@/lib/types';

const paymentMethods = [
  { 
    id: 'cash', 
    name: 'Efectivo', 
    icon: '💵',
    description: 'Pago en efectivo al recibir el producto' 
  },
  { 
    id: 'card', 
    name: 'Tarjeta (POS físico)', 
    icon: '💳',
    description: 'Pago con tarjeta al recibir el producto' 
  },
  { 
    id: 'transfer', 
    name: 'Transferencia', 
    icon: '⇄',
    description: 'Transferencia bancaria antes de la entrega' 
  },
  { 
    id: 'paid', 
    name: 'Ya pagado', 
    icon: '✓',
    description: 'El diseñador ha confirmado el pago',
  }
];

export function PaymentMethodViewer({ metodoPago }: { metodoPago?: MetodoPago }) {
  if (!metodoPago) {
    return <p className="text-sm text-gray-500">No se ha registrado un método de pago.</p>;
  }

  const method = paymentMethods.find(m => m.id === metodoPago);

  if (!method) return <p className="text-sm text-gray-500">Método no válido.</p>;

  return (
    <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
      <span className="text-2xl">{method.icon}</span>
      <div>
        <p className="font-medium">{method.name}</p>
        <p className="text-sm text-gray-600">{method.description}</p>
      </div>
    </div>
  );
}
