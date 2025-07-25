'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

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
      disabled: true
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900 text-sm">Método de pago</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            disabled={method.disabled}
            onClick={() => !method.disabled && setSelectedMethod(method.id)}
            className={cn(
              'flex flex-col items-center justify-center p-4 border rounded-lg transition-colors',
              selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:bg-gray-50',
              method.disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer'
            )}
          >
            <span className="text-2xl mb-2">{method.icon}</span>
            <span className="font-medium">{method.name}</span>
            <span className="text-xs text-gray-500 mt-1 text-center">{method.description}</span>
          </button>
        ))}
      </div>

      {selectedMethod && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-700 text-sm">
          <span className="font-medium">Método seleccionado: </span>
          {paymentMethods.find(m => m.id === selectedMethod)?.name}
        </div>
      )}
    </div>
  );
}