import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/textarea';
import { submitFeedback } from '@/lib/api/clientes';
import { validateRole } from '@/lib/auth';

export default function FeedbackPage({
  params
}: {
  params: { id: string }
}) {
  async function handleSubmit(formData: FormData) {
    'use server';
    await validateRole('CLIENTE');
    
    await submitFeedback({
      pedidoId: params.id,
      comentario: formData.get('comentario') as string,
      calificacion: Number(formData.get('calificacion'))
    });
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Enviar Feedback</h1>
      
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Calificación (1-5)
          </label>
          <select
            name="calificacion"
            className="block w-full rounded-md border border-gray-300 p-2"
            required
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Comentarios
          </label>
          <Textarea
            name="comentario"
            placeholder="¿Cómo fue tu experiencia con este pedido?"
            rows={5}
            required
          />
        </div>

        <Button type="submit">Enviar Feedback</Button>
      </form>
    </div>
  );
}