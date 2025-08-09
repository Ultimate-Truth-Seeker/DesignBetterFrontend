'use client'
import {useState, useEffect, useMemo} from 'react'
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/textarea';
import { fetchPedidoTrackingClient, submitFeedback } from '@/lib/api/clientes';
import { validateRole } from '@/lib/auth';
import { HistorialItem, PedidoTracking } from '@/lib/types';
import { TrackingTimeline } from '@/components/clients/TrackingTimeline';

export default function FeedbackPage({
  pedidoId
}: {
  pedidoId: number
}) {
  function handleSubmit(formData: FormData) {
    //'use server';
    //await validateRole('CLIENTE');
    
    //await submitFeedback({
      //pedidoId: params.id,
      //comentario: formData.get('comentario') as string,
      //calificacion: Number(formData.get('calificacion'))
    //});
  }
  const [tracking, setTracking] = useState<PedidoTracking | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPedidoTrackingClient(pedidoId);
        if (!cancel) setTracking(data);
      } catch (e: any) {
        if (!cancel) setErr(e?.message ?? 'Error cargando tracking');
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [pedidoId]);
  const historialOrdenado: HistorialItem[] = useMemo(() => {
    const h = tracking?.historial ?? [];
    return [...h].sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
  }, [tracking]);

  return (
    
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-2">
      <h3 className="font-semibold">Historial del pedido #{pedidoId}</h3>
      <TrackingTimeline historial={historialOrdenado} />
    </div>
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