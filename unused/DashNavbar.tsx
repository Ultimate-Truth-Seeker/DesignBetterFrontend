'use client';

//import Link from 'next/link';
import { useAuth } from "@/components/AuthProvider"


export default function Navbar() {
    const { logout } = useAuth()

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold ">Design Better</h1>
      <div className="space-x-4">
      <button
        onClick={logout}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>
      </div>
    </nav>
  );
}