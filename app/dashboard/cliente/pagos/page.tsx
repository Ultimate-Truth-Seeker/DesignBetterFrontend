// app/dashboard/cliente/pagos/page.tsx
'use client';

import { PaymentMethodSelector } from '@/components/clients/PaymentMethodSelector';

export default function PaymentMethodsPage() {
  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Métodos de Pago</h1>
      <div className="bg-white p-6 rounded-lg border">
        <PaymentMethodSelector />
      </div>
    </div>
  );
}