'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BellIcon, CheckCircle, Info, AlertCircle, Clock } from 'lucide-react';

export type NotificationType = 'new' | 'update' | 'warning' | 'completed';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'new',
      title: 'Nuevo pedido creado',
      message: 'Tu pedido "Vestido de gala" ha sido creado exitosamente',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
      read: false
    },
    {
      id: '2',
      type: 'update',
      title: 'Estado actualizado',
      message: 'Tu pedido "Traje formal" está ahora en proceso',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Acción requerida',
      message: 'Por favor envía las medidas faltantes para tu pedido "Camisa casual"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
      read: true
    },
    {
      id: '4',
      type: 'completed',
      title: 'Pedido completado',
      message: 'Tu pedido "Chaqueta de cuero" está listo para recoger',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
      read: true
    }
  ]);

  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Calcular notificaciones no leídas
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? {...n, read: true} : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({...n, read: true}))
    );
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) return `Hace ${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours} h`;
    
    const days = Math.floor(hours / 24);
    return `Hace ${days} d`;
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'new': return <Info className="text-blue-500" size={18} />;
      case 'update': return <Clock className="text-yellow-500" size={18} />;
      case 'warning': return <AlertCircle className="text-orange-500" size={18} />;
      case 'completed': return <CheckCircle className="text-green-500" size={18} />;
      default: return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <BellIcon className="text-gray-600" size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center bg-red-500 text-white text-xs rounded-full w-5 h-5">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Notificaciones</h3>
            <button 
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Marcar todas como leídas
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No tienes notificaciones
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={cn(
                    'p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer',
                    !notification.read ? 'bg-blue-50' : ''
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <span className="text-xs text-gray-500">
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 bg-gray-50 text-center">
            <button 
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => setShowNotifications(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}