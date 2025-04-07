// @/lib/types.ts
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
  
  export type PedidoDetallado = Pedido & {
    historial: {
      fecha: string;
      estado: EstadoPedido;
      mensaje?: string;
    }[];
    archivos?: ArchivoAdjunto[];
    feedback?: Feedback;
  };
  
  export type DashboardCliente = {
    nombre: string;
    pedidosPendientes: number;
    pedidosEnProceso: number;
    ultimosPedidos: Pedido[];
  };