'use client';

import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';

export function NewPedidoForm({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => void;
}) {
  const [state, formAction] = useFormState(onSubmit, null);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label htmlFor="plantilla" className="block text-sm font-medium mb-1">
            Buscar plantilla
          </label>
          <Input
            id="buscarPlantilla"
            name="buscarPlantilla"
            placeholder="Buscar plantillas..."
            label={''}
          />
          
          <div className="mt-2">
            <label htmlFor="plantilla" className="block text-sm font-medium mb-1">
              Seleccionar plantilla
            </label>
            <select
              id="plantilla"
              name="plantilla"
              className="w-full p-2 border rounded-md text-sm"
              required
            >
              <option value="">Selecciona una plantilla</option>
              <option value="plantilla1">Plantilla Básica</option>
              <option value="plantilla2">Plantilla Premium</option>
              <option value="plantilla3">Plantilla Personalizada</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="titulo" className="block text-sm font-medium mb-1">
            Título del pedido
          </label>
          <Input
            id="titulo"
            name="titulo"
            placeholder="Ej: Diseño de logotipo para restaurante"
            required 
            label={''}
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium mb-1">
            Descripción detallada
          </label>
          <Textarea
            id="descripcion"
            name="descripcion"
            rows={6}
            placeholder="Describe en detalle lo que necesitas..."
            required
          />
        </div>

        {/* Agrega más campos según necesites */}
      </div>

      <div className="flex gap-4">
        <Button type="submit">Enviar pedido</Button>
        <Button variant="outline" type="button" asChild>
          <a href="/dashboard/cliente/pedidos">Cancelar</a>
        </Button>
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}
    </form>
  );
}