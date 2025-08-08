// components/common/FloatingChat.tsx
'use client';

import { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export function FloatingChat() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isExpanded ? (
        // Estado minimizado
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all"
        >
          <MessageSquare size={20} />
          <span>Mensajes</span>
        </button>
      ) : (
        // Estado expandido
        <div className="w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Cabecera */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Centro de Ayuda</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-blue-700 rounded"
            >
              <ChevronDown size={18} />
            </button>
          </div>
          
          {/* Contenido */}
          <div className="h-96 p-4 overflow-y-auto">
            {/* Mensaje de bienvenida */}
            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg mb-4">
              <p>Hola, ¿en qué podemos ayudarte?</p>
            </div>
            
            {/* FAQs básicas */}
            <div className="space-y-3">
              <div className="border-b pb-3">
                <h4 className="font-medium">¿Cómo cambio mi información?</h4>
                <p className="text-sm text-gray-600 mt-1">Ve a Configuración → Editar perfil</p>
              </div>
              <div className="border-b pb-3">
                <h4 className="font-medium">¿Dónde veo mis pedidos?</h4>
                <p className="text-sm text-gray-600 mt-1">En la sección "Mis Pedidos"</p>
              </div>
            </div>
          </div>
          
          {/* Input (deshabilitado por ahora) */}
          <div className="p-3 border-t bg-gray-50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Próximamente: Chat en vivo..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
                disabled
              />
              <button 
                className="bg-gray-400 text-white p-2 rounded-lg"
                disabled
              >
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}