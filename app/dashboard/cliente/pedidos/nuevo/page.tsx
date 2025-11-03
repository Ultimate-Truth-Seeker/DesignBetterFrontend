'use client'

import { NewPedidoForm } from '@/components/clients/NewPedidoForm';
import { createPedido, NuevoPedidoPayload } from '@/lib/api/clientes';

export default function NewPedidoPage() {
  //const templates = getPlantillas(); // server-side
  async function handleCreatePedido(formData: FormData) {
  //'use server';

  // suponiendo que en tu <NewPedidoForm>  
  // tienes inputs con name="plantilla", "color", "ajustes" y "notas"
  const payload: NuevoPedidoPayload = {
    plantilla: Number(formData.get('plantilla')),
    color:       '-',//formData.get('color')       as string,
    // si 'ajustes' es un JSON-string en un textarea o input hidden:
    ajustes:    '',//JSON.parse(formData.get('ajustes') as string),
    notas:       '-'//formData.get('notas')       as string,
  };

  try {
    await createPedido(payload);
    //redirect('/cliente/pedidos?creado=true');
  } catch (error) {
    console.error('Error creando pedido:', error);
    //redirect('/cliente/pedidos/nuevo?error=true');
  }
}

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Nuevo Pedido</h1>
        <p className="text-muted-foreground">
          Completa los detalles de tu nuevo pedido de diseño
        </p>
      </header>

      <NewPedidoForm onSubmit={handleCreatePedido} />
    </div>
  );
}