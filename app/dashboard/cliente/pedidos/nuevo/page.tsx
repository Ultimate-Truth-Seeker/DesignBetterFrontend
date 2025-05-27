import { redirect } from 'next/navigation';
import { NewPedidoForm } from '@/components/clients/NewPedidoForm';
import { createPedido } from '@/lib/api/clientes';
import { validateRole } from '@/lib/auth';

export default function NewPedidoPage() {
  async function handleCreatePedido(formData: FormData) {
    'use server';
    
    await validateRole('CLIENTE');
    
    const rawData = {
      titulo: formData.get('titulo') as string,
      descripcion: formData.get('descripcion') as string,
      // Agrega más campos según necesites
    };

    try {
      await createPedido(rawData);
      redirect('/cliente/pedidos?creado=true');
    } catch (error) {
      console.error('Error creando pedido:', error);
      redirect('/cliente/pedidos/nuevo?error=true');
    }
  }
  async function debugSubmit(formData: FormData) {
    'use server';
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Nuevo Pedido</h1>
        <p className="text-muted-foreground">
          Completa los detalles de tu nuevo pedido de diseño
        </p>
      </header>

      <NewPedidoForm onSubmit={debugSubmit} />
    </div>
  );
}