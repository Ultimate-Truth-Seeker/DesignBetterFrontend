'use client';

import { cn } from '@/lib/utils';
import { Clock, CheckCircle, Edit, AlertCircle, User, Mail, CreditCard } from 'lucide-react';
import { useState } from 'react';

// Tipos de eventos en el historial
type HistoryEventType = 
  | 'creation' 
  | 'status_change' 
  | 'modification' 
  | 'message' 
  | 'payment' 
  | 'completion';

interface HistoryEvent {
  id: string;
  type: HistoryEventType;
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    role: string;
  };
  details?: Record<string, any>;
}

interface PedidoHistoryTimelineProps {
  pedidoId: string;
  className?: string;
}

export function PedidoHistoryTimeline({ pedidoId, className }: PedidoHistoryTimelineProps) {
  const [events] = useState<HistoryEvent[]>([
    {
      id: '1',
      type: 'creation',
      title: 'Pedido creado',
      description: 'El cliente inició un nuevo pedido',
      timestamp: new Date('2023-10-15T09:30:00'),
      user: {
        name: 'María López',
        role: 'Cliente'
      }
    },
    {
      id: '2',
      type: 'modification',
      title: 'Detalles actualizados',
      description: 'Se modificaron las especificaciones del diseño',
      timestamp: new Date('2023-10-16T11:45:00'),
      user: {
        name: 'María López',
        role: 'Cliente'
      },
      details: {
        changes: ['Tela cambiada a algodón orgánico', 'Color actualizado a azul marino']
      }
    },
    {
      id: '3',
      type: 'status_change',
      title: 'Estado cambiado a "En proceso"',
      description: 'El diseñador comenzó a trabajar en el pedido',
      timestamp: new Date('2023-10-18T14:20:00'),
      user: {
        name: 'Carlos Rodríguez',
        role: 'Diseñador'
      }
    },
    {
      id: '4',
      type: 'message',
      title: 'Consulta enviada',
      description: 'El diseñador solicitó información adicional',
      timestamp: new Date('2023-10-20T10:15:00'),
      user: {
        name: 'Carlos Rodríguez',
        role: 'Diseñador'
      }
    },
    {
      id: '5',
      type: 'payment',
      title: 'Pago confirmado',
      description: 'Se recibió el pago inicial del 50%',
      timestamp: new Date('2023-10-22T16:40:00'),
      details: {
        method: 'Transferencia bancaria',
        amount: '250.00 €'
      }
    },
    {
      id: '6',
      type: 'modification',
      title: 'Ajustes realizados',
      description: 'Se realizaron cambios según las indicaciones del cliente',
      timestamp: new Date('2023-10-25T13:10:00'),
      user: {
        name: 'Carlos Rodríguez',
        role: 'Diseñador'
      }
    },
    {
      id: '7',
      type: 'status_change',
      title: 'Estado cambiado a "En revisión"',
      description: 'El pedido está listo para su aprobación final',
      timestamp: new Date('2023-10-28T11:30:00'),
      user: {
        name: 'Carlos Rodríguez',
        role: 'Diseñador'
      }
    },
    {
      id: '8',
      type: 'completion',
      title: 'Pedido completado',
      description: 'El cliente aprobó el diseño final',
      timestamp: new Date('2023-10-30T15:00:00'),
      user: {
        name: 'María López',
        role: 'Cliente'
      }
    }
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventIcon = (type: HistoryEventType) => {
    switch (type) {
      case 'creation':
        return <CheckCircle className="text-blue-500" size={18} />;
      case 'status_change':
        return <Clock className="text-purple-500" size={18} />;
      case 'modification':
        return <Edit className="text-yellow-500" size={18} />;
      case 'message':
        return <Mail className="text-green-500" size={18} />;
      case 'payment':
        return <CreditCard className="text-teal-500" size={18} />;
      case 'completion':
        return <CheckCircle className="text-green-500" size={18} />;
      default:
        return <AlertCircle className="text-gray-500" size={18} />;
    }
  };

  const getEventColor = (type: HistoryEventType) => {
    switch (type) {
      case 'creation': return 'bg-blue-100 border-blue-300';
      case 'status_change': return 'bg-purple-100 border-purple-300';
      case 'modification': return 'bg-yellow-100 border-yellow-300';
      case 'message': return 'bg-green-100 border-green-300';
      case 'payment': return 'bg-teal-100 border-teal-300';
      case 'completion': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className={cn('bg-white rounded-lg border p-6', className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Historial del Pedido #{pedidoId}</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-1" size={16} />
          <span>Última actualización: {formatDate(events[0].timestamp)}</span>
        </div>
      </div>

      <div className="relative">
        {/* Línea vertical central */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 -z-10"></div>

        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={event.id} className="relative flex" name={index}>
              {/* Punto en la línea de tiempo */}
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2",
                getEventColor(event.type)
              )}>
                {getEventIcon(event.type)}
              </div>

              {/* Contenido del evento */}
              <div className="ml-4 flex-1 pb-8">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    <span className="text-sm text-gray-500">{formatDate(event.timestamp)}</span>
                  </div>
                  
                  <p className="mt-2 text-gray-600">{event.description}</p>
                  
                  {event.user && (
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <User className="mr-2" size={14} />
                      <span>{event.user.name} ({event.user.role})</span>
                    </div>
                  )}
                  
                  {event.details && (
                    <div className="mt-3 pt-3 border-t">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Detalles:</h4>
                      {event.details.changes ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {event.details.changes.map((change: string, i: number) => (
                            <li key={i} className="text-sm text-gray-600">{change}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(event.details).map(([key, value]) => (
                            <div key={key} className="flex">
                              <span className="font-medium text-gray-700">{key}:</span>
                              <span className="ml-2 text-gray-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}