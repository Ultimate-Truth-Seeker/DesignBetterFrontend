'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, User, Bot } from 'lucide-react';

// Definir tipos para los mensajes
type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  showTransferButton?: boolean;
  isTransfer?: boolean;
};

type FAQResponse = {
  response: string;
  requiresHuman: boolean;
};

type FAQDatabase = {
  [key: string]: FAQResponse;
};

const FashionChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual especializado en moda. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTransferMessage, setShowTransferMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Base de conocimientos FAQ para diseñadores de moda
  const faqDatabase: FAQDatabase = {
    // Preguntas sobre productos
    'tallas|sizes|medidas': {
      response: "📏 **Guía de Tallas**: Ofrecemos desde XS hasta XXL. Puedes consultar nuestra tabla de medidas en cada producto. Si necesitas ayuda específica con tallaje, ¿te gustaría hablar con un asesor especializado?",
      requiresHuman: false
    },
    'materiales|telas|fabric': {
      response: "🧵 **Materiales Premium**: Trabajamos con algodón orgánico, seda natural, lino europeo y mezclas sostenibles. Cada producto especifica su composición. ¿Buscas algo específico?",
      requiresHuman: false
    },
    'envío|shipping|entrega': {
      response: "🚚 **Envíos**: Enviamos a toda Latinoamérica. Tiempo estimado: 3-7 días hábiles. Envío gratis en compras superiores a $100. ¿Necesitas información sobre algún destino específico?",
      requiresHuman: false
    },
    'devoluciones|cambios|returns': {
      response: "🔄 **Política de Cambios**: 30 días para devoluciones. El producto debe estar sin uso con etiquetas. Proceso simple desde tu cuenta. ¿Necesitas iniciar un cambio?",
      requiresHuman: false
    },
    'precio|cost|precio': {
      response: "💰 **Precios**: Manejamos diferentes rangos según la línea: Casual ($30-80), Premium ($80-150), Alta Costura ($150-500). ¿Te interesa alguna línea en particular?",
      requiresHuman: false
    },
    
    // Preguntas que requieren asesor humano
    'diseño personalizado|custom|personalizar': {
      response: "🎨 **Diseños Personalizados**: ¡Perfecto! Nuestros diseñadores pueden crear piezas únicas para ti. Este servicio requiere consulta personalizada. Te conectaré con un especialista en diseño.",
      requiresHuman: true
    },
    'asesoría de imagen|styling|estilismo': {
      response: "💫 **Asesoría de Imagen**: Nuestros estilistas profesionales pueden ayudarte a crear el look perfecto. Te conectaré con un asesor de imagen especializado.",
      requiresHuman: true
    },
    'mayoreo|wholesale|distribuidor': {
      response: "🏢 **Ventas al Mayoreo**: Excelente oportunidad de negocio. Tenemos programas especiales para distribuidores. Te conectaré con nuestro equipo comercial.",
      requiresHuman: true
    },
    'problema|reclamo|queja': {
      response: "🤝 **Soporte Especializado**: Lamento que tengas un inconveniente. Tu satisfacción es nuestra prioridad. Te conectaré inmediatamente con un supervisor para resolver tu situación.",
      requiresHuman: true
    }
  };

  // Respuestas adicionales para crear conversación natural
  const casualResponses = [
    "¿Hay algo más en lo que pueda ayudarte con tu experiencia de compra? 🛍️",
    "¿Te gustaría conocer nuestras nuevas colecciones de temporada? ✨",
    "¿Necesitas recomendaciones para alguna ocasión especial? 🎉"
  ];

  const findBestResponse = (message: string): FAQResponse => {
    const lowerMessage = message.toLowerCase();
    
    // Buscar coincidencias en la base de datos
    for (const [keywords, response] of Object.entries(faqDatabase)) {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => lowerMessage.includes(keyword))) {
        return response;
      }
    }

    // Respuestas para saludos
    if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('buenas')) {
      return {
        response: "¡Hola! 👋 Bienvenido a nuestro ecommerce de moda para diseñadores. ¿En qué puedo ayudarte? Puedo responder sobre productos, envíos, tallas, materiales y conectarte con especialistas cuando lo necesites.",
        requiresHuman: false
      };
    }

    if (lowerMessage.includes('gracias') || lowerMessage.includes('thanks')) {
      return {
        response: "¡De nada! 😊 Estoy aquí para ayudarte en todo lo que necesites. " + casualResponses[Math.floor(Math.random() * casualResponses.length)],
        requiresHuman: false
      };
    }

    // Respuesta por defecto
    return {
      response: "No tengo información específica sobre eso, pero puedo conectarte con uno de nuestros asesores especializados que podrá ayudarte de manera personalizada. ¿Te gustaría que los contacte?",
      requiresHuman: true
    };
  };

  const handleTransferToHuman = () => {
    setShowTransferMessage(true);
    const transferMessage: Message = {
      id: Date.now(),
      text: "🔄 **Conectando con asesor humano...**\n\nHe iniciado la transferencia a nuestro equipo de especialistas. Un asesor se pondrá en contacto contigo en los próximos minutos. Mientras tanto, puedes seguir escribiéndome si tienes otras consultas.\n\n📞 También puedes contactarnos directamente:\n• WhatsApp: +502 1234-5678\n• Email: asesores@fashiondesign.com",
      isBot: true,
      timestamp: new Date(),
      isTransfer: showTransferMessage
    };

    setMessages(prev => [...prev, transferMessage]);
    
    // Ocultar el mensaje de transferencia después de unos segundos
    setTimeout(() => {
      setShowTransferMessage(false);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simular tiempo de respuesta del bot
    setTimeout(() => {
      const response = findBestResponse(inputMessage);
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Si requiere humano, mostrar opción de transferencia
      if (response.requiresHuman) {
        setTimeout(() => {
          const transferOption: Message = {
            id: Date.now() + 2,
            text: "¿Te gustaría que te conecte con un asesor especializado ahora?",
            isBot: true,
            timestamp: new Date(),
            showTransferButton: true
          };
          setMessages(prev => [...prev, transferOption]);
        }, 1000);
      }
    }, 1000 + Math.random() * 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const nextSibling = target.nextSibling as HTMLElement;
    if (nextSibling) {
      nextSibling.style.display = 'flex';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón flotante cuando está minimizado */}
      {isMinimized && (
        <div 
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg cursor-pointer flex items-center justify-center hover:scale-110 transition-transform duration-300"
          onClick={() => setIsMinimized(false)}
        >
          <img 
            src="./chatbot/chatbot.png" 
            alt="Fashion Assistant"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
            onError={handleImageError}
          />
          <Bot className="w-8 h-8 text-white hidden" />
        </div>
      )}

      {/* Ventana del chat */}
      {!isMinimized && (
        <div className="w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src="./chatbot/chatbot.png" 
                  alt="Fashion Assistant"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  onError={handleImageError}
                />
                <Bot className="w-10 h-10 hidden bg-white bg-opacity-20 rounded-full p-2" />
                <div>
                  <h3 className="font-bold text-lg">Asistente de Moda</h3>
                  <p className="text-sm opacity-90">Especialista en Diseño</p>
                </div>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-[440px]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.isBot 
                    ? 'bg-white shadow-sm border border-gray-100' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.isBot && (
                      <img 
                        src="./chatbot.png" 
                        alt="Bot"
                        className="w-6 h-6 rounded-full object-cover mt-1 flex-shrink-0"
                        onError={handleImageError}
                      />
                    )}
                    {message.isBot && (
                      <Bot className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0 hidden" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.text}
                      </p>
                      {message.showTransferButton && (
                        <button
                          onClick={handleTransferToHuman}
                          className="mt-3 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
                        >
                          🤝 Conectar con Asesor
                        </button>
                      )}
                    </div>
                    {!message.isBot && (
                      <User className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta sobre moda, tallas, envíos..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent max-h-20"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Presiona Enter para enviar • Shift+Enter para nueva línea
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionChatbot;