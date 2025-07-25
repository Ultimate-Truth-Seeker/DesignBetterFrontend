import { HistorialItem } from '@/lib/types';

interface Props {
  historial: HistorialItem[];
}

export function TrackingTimeline({ historial }: Props) {
  return (
    <ol className="border-l-2 border-gray-200">
      {historial.map((item, idx) => (
        <li key={idx} className="mb-6 ml-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full -ml-1 mr-3"></div>
            <time className="text-sm font-normal text-gray-500">
              {new Date(item.fecha).toLocaleString('es-ES', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </time>
          </div>
          <div className="mt-2 ml-6">
            <p className="font-semibold text-gray-800">{item.estado}</p>
            {item.notas && (
              <p className="mt-1 text-sm text-gray-600">{item.notas}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}