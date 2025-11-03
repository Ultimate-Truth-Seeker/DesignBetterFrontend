'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Pedido {
  id: string;
  titulo: string;
  nombre: string;
  apellido: string;
  email: string;
  fecha: string;
  estado: 'pendiente' | 'en progreso' | 'completado' | 'todos los pedidos';
}

const initialPedidos: Pedido[] = [
  // Datos de ejemplo, se conectará a la API después
  { id: '1', titulo: 'Diseño para mi prenda', nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com', fecha: '2025-07-24', estado: 'pendiente' },
  { id: '2', titulo: 'Prenda personalizada', nombre: 'María', apellido: 'Gómez', email: 'maria@example.com', fecha: '2025-07-23', estado: 'en progreso' },
];

export function PedidoFilter() {
  const [pedidos, setPedidos] = useState<Pedido[]>(initialPedidos);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  useEffect(() => {
    // Simulamos la  API para pedidos
    // Se reemplazará con los datos reales después
    setPedidos(initialPedidos);
  }, []);

  const filteredPedidos = pedidos.filter(pedido => {
    const matchesNombre = pedido.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) || pedido.apellido.toLowerCase().includes(filtroNombre.toLowerCase());
    const matchesEstado = !filtroEstado || pedido.estado === filtroEstado;
    const matchesFecha = !filtroFecha || pedido.fecha.includes(filtroFecha);
    return matchesNombre && matchesEstado && matchesFecha;
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label htmlFor="filtroNombre" className="block text-sm font-medium mb-1">
            Filtrar por nombre
          </label>
          <Input
            id="filtroNombre"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
            label={''}
          />
        </div>

        <div>
          <label htmlFor="filtroEstado" className="block text-sm font-medium mb-1">
            Filtrar por estado
          </label>
          <select
            id="filtroEstado"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En progreso</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        <div>
          <label htmlFor="filtroFecha" className="block text-sm font-medium mb-1">
            Filtrar por fecha
          </label>
          <Input
            id="filtroFecha"
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            label={''}
          />
        </div>

        <Button onClick={() => {
          setFiltroNombre('');
          setFiltroEstado('');
          setFiltroFecha('');
        }}>
          Limpiar filtros
        </Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-bold">Pedidos</h2>
        {filteredPedidos.length > 0 ? (
          filteredPedidos.map(pedido => (
            <div key={pedido.id} className="p-4 border rounded-md">
              <p><strong>Título:</strong> {pedido.titulo}</p>
              <p><strong>Cliente:</strong> {pedido.nombre} {pedido.apellido}</p>
              <p><strong>Email:</strong> {pedido.email}</p>
              <p><strong>Fecha:</strong> {pedido.fecha}</p>
              <p><strong>Estado:</strong> {pedido.estado}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron pedidos.</p>
        )}
      </div>
    </div>
  );
}