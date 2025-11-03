// app/mensajes/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Search, MessageSquare } from 'lucide-react';
import { 
  listarConversaciones, 
  obtenerConversacion, 
  enviarMensaje, 
  crearConversacion,
  Conversacion,
  Mensaje,
} from '@/lib/api/clientes';

export default function MensajesPage() {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([]);
  const [conversacionActiva, setConversacionActiva] = useState<Conversacion | null>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [creandoNuevaConversacion, setCreandoNuevaConversacion] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cargar conversaciones al iniciar
  useEffect(() => {
    const cargarConversaciones = async () => {
      try {
        setCargando(true);
        const data = await listarConversaciones();
        setConversaciones(data);
        if (data.length > 0 && !conversacionActiva) {
          setConversacionActiva(data[0]);
        }
      } catch (error) {
        console.error('Error al cargar conversaciones:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarConversaciones();
  }, [conversacionActiva]);

  // Cargar mensajes cuando cambia la conversación activa
  useEffect(() => {
    const cargarMensajes = async () => {
      if (conversacionActiva) {
        try {
          const mensajesData = await obtenerConversacion(conversacionActiva.id);
          setMensajes(mensajesData.mensajes || []);
        } catch (error) {
          console.error('Error al cargar mensajes:', error);
        }
      }
    };

    cargarMensajes();
  }, [conversacionActiva]);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMensaje.trim() || !conversacionActiva) return;

    try {
      const mensajeEnviado = await enviarMensaje({
        conversacion: conversacionActiva.id,
        contenido: nuevoMensaje.trim()
      });

      // Actualizar la lista de mensajes
      setMensajes([...mensajes, mensajeEnviado]);
      setNuevoMensaje('');

      // Actualizar la última conversación en la lista
      const conversacionesActualizadas = conversaciones.map(conv => 
        conv.id === conversacionActiva.id 
          ? { ...conv, mensajes: [...conv.mensajes, mensajeEnviado] }
          : conv
      );
      setConversaciones(conversacionesActualizadas);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const handleCrearConversacion = async (participanteId: number) => {
    try {
      const nuevaConversacion = await crearConversacion({
        participantes: [participanteId] // Aquí necesitarías obtener el ID del otro usuario
      });
      
      setConversaciones([nuevaConversacion, ...conversaciones]);
      setConversacionActiva(nuevaConversacion);
      if (creandoNuevaConversacion) {}
      setCreandoNuevaConversacion(false);
    } catch (error) {
      console.error('Error al crear conversación:', error);
    }
  };

  const conversacionesFiltradas = conversaciones.filter(conv =>
    conv.participantes.some(p => 
      p.username.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar de conversaciones */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Mensajes</h1>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <button
            onClick={() => {setCreandoNuevaConversacion(true); handleCrearConversacion(1)}}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Nueva conversación
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversacionesFiltradas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {busqueda ? 'No se encontraron conversaciones' : 'No tienes conversaciones'}
            </div>
          ) : (
            conversacionesFiltradas.map((conversacion) => (
              <div
                key={conversacion.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  conversacionActiva?.id === conversacion.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setConversacionActiva(conversacion)}
              >
                <div className="flex items-center">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversacion.participantes
                        .filter(p => p.id !== 1) // Filtrar el usuario actual (necesitarías obtener el ID real del usuario actual)
                        .map(p => p.username)
                        .join(', ')}
                    </h3>
                    {conversacion.mensajes.length > 0 && (
                      <p className="text-sm text-gray-500 truncate">
                        {conversacion.mensajes[conversacion.mensajes.length - 1].contenido}
                      </p>
                    )}
                  </div>
                  {conversacion.mensajes.length > 0 && (
                    <span className="text-xs text-gray-400">
                      {new Date(conversacion.mensajes[conversacion.mensajes.length - 1].enviado_en).toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Área de chat principal */}
      <div className="flex-1 flex flex-col">
        {conversacionActiva ? (
          <>
            {/* Cabecera del chat */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {conversacionActiva.participantes
                  .filter(p => p.id !== 1) // Filtrar el usuario actual
                  .map(p => p.username)
                  .join(', ')}
              </h2>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {mensajes.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No hay mensajes en esta conversación
                </div>
              ) : (
                <div className="space-y-4">
                  {mensajes.map((mensaje) => (
                    <div
                      key={mensaje.id}
                      className={`flex ${mensaje.remitente.id === 1 ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          mensaje.remitente.id === 1
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{mensaje.contenido}</p>
                        <p
                          className={`text-xs mt-1 ${
                            mensaje.remitente.id === 1 ? 'text-blue-200' : 'text-gray-500'
                          }`}
                        >
                          {new Date(mensaje.enviado_en).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input de mensaje */}
            <form onSubmit={handleEnviarMensaje} className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!nuevoMensaje.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Selecciona una conversación</h3>
              <p>Elige una conversación existente o inicia una nueva</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}