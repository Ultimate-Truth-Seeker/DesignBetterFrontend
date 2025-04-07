'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MiProyecto3D</h1>
      <div className="space-x-4">
        <Link href="/login" className="text-blue-600 hover:underline">Iniciar sesión</Link>
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Registrarse
        </Link>
      </div>
    </nav>
  );
}