// @/lib/types.ts

// Tipos básicos (se mantienen igual)
export type UserPreferences = {
    notifications?: boolean;
    darkMode?: boolean;
  };
  
  export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    preferences?: UserPreferences;
  };
  
  export type Disenador = {
    id: string;
    nombre: string;
    email: string;
    avatar?: string;
  };
  
  export type EstadoPedido = 'pendiente' | 'en_proceso' | 'completado' | 'revision';
  
  export type ArchivoAdjunto = {
    nombre: string;
    url: string;
    tipo: string;
    tamaño: number;
  };
  
  export type Feedback = {
    id: string;
    calificacion: number;
    comentario: string;
    fecha: string;
  };
  
  export type Pedido = {
    id: string;
    titulo: string;
    estado: EstadoPedido;
    fecha: string;
    fechaEntrega?: string;
    descripcion: string;
    disenador?: Disenador;
  };
  
  export type MetodoPago = 'cash' | 'card' | 'transfer' | 'paid';

  export type PedidoDetallado = Pedido & {
    historial: {
      fecha: string;
      estado: EstadoPedido;
      mensaje?: string;
    }[];
    archivos?: ArchivoAdjunto[];
    feedback?: Feedback;
    metodopago?: MetodoPago;
  };
  
  export type DashboardCliente = {
  nombre: string;
  pedidosPendientes: number;
  pedidosEnProceso: number;
  ultimosPedidos: Array<{
    id: number;
    titulo: string;              // derivado de notas o fallback
    fecha: string;               // ISO o Date
    estado: string;
  }>;
};
  
export type HistorialItem = {
  fecha: string;        // ISO
  estado: string;       // slug
  notas?: string | null;
  usuario?: string;     // opcional si lo quieres mostrar
};

export type PedidoTracking = {
  id: number;
  plantilla: number;
  color: string;
  ajustes: any;
  notas: string;
  estado: string;
  pago_realizado: boolean;
  usuario: number;
  disenador: number | null;
  fecha_creacion: string;
  historial: HistorialItem[];
};

  // =============================================
  // NUEVOS TIPOS PARA ADMINISTRACIÓN DE CLIENTES
  // =============================================
  
  export type ClientStatus = 'activo' | 'suspendido' | 'pendiente';
  
  export type ClientAddress = {
    calle: string;
    ciudad: string;
    codigoPostal: string;
    pais: string;
  };
  
  export type ClientNotificationPrefs = {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  
  export type ClientInternalNote = {
    id: string;
    contenido: string;
    autor: string;
    fechaCreacion: string;
  };
  
  export type ClientStats = {
    totalPedidos: number;
    pedidosActivos: number;
    calificacionPromedio?: number;
    totalGastado: number;
  };
  
  export type ClientActivity = {
    tipo: 'login' | 'pedido' | 'actualizacion' | 'comunicacion';
    fecha: string;
    descripcion: string;
    metadata?: Record<string, unknown>;
  };
  
  export interface AdminClient extends User {
    telefono?: string;
    avatarUrl?: string;
    estado: ClientStatus;
    emailVerificado: boolean;
    ultimoAcceso?: string;
    empresa?: string;
    direccion?: ClientAddress;
    preferencias: UserPreferences & {
      metodosNotificacion: ClientNotificationPrefs;
      disenadorPreferido?: string;
    };
    metadatos?: {
      tasaDescuento?: number;
      limiteCredito?: number;
      notasInternas?: ClientInternalNote[];
    };
    estadisticas: ClientStats;
    actividadReciente?: ClientActivity[];
  }
  
  export type AdminClientFormValues = {
    nombre: string;
    email: string;
    telefono?: string;
    avatarUrl?: string;
    estado: ClientStatus;
    roles: string[];
    empresa?: string;
    direccion?: ClientAddress;
    preferencias: {
      notificaciones: ClientNotificationPrefs;
      disenadorId?: string;
    };
    metadatos?: {
      tasaDescuento?: number;
      limiteCredito?: number;
      notaInterna?: string;
    };
  };
  
  export type AdminClientListResponse = {
    clientes: AdminClient[];
    total: number;
    pagina: number;
    porPagina: number;
  };
  
  export type AdminClientOrderStats = {
    estado: EstadoPedido;
    cantidad: number;
    montoTotal: number;
  };
  
  export type AdminClientDetailResponse = {
    cliente: AdminClient;
    estadisticasPedidos: AdminClientOrderStats[];
    actividad: ClientActivity[];
  };

  export type UsuarioMensajeria = {
  id: number;
  username: string;
  rol: string;
};

export type Mensaje = {
  id: number;
  remitente: UsuarioMensajeria;
  rol_remitente: string;
  contenido: string;
  enviado_en: string;
};

export type Conversacion = {
  id: number;
  participantes: UsuarioMensajeria[];
  mensajes: Mensaje[];
  creado_en: string;
};

export type CrearConversacionPayload = {
  participantes: number[];
};

export type EnviarMensajePayload = {
  conversacion: number;
  contenido: string;
};