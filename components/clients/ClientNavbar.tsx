'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutUser } from '@/lib/auth/actions';
import { useAuth } from "@/components/AuthProvider"
import { PaymentMethodSelector } from '@/components/clients/PaymentMethodSelector';

export default function ClientNavbar() {
  const pathname = usePathname();
  const { logout } = useAuth()


  const links = [
    { href: '/dashboard/cliente', label: 'Inicio' },
    { href: '/dashboard/cliente/pedidos', label: 'Mis Pedidos' },
    { href: '/dashboard/cliente/favoritos', label: 'Favoritos' },
    { href: '/dashboard/cliente/pagos', label: 'Métodos de Pago', component: PaymentMethodSelector }
  ];

  return (
    <nav className="client-navbar flex justify-between items-center px-8 py-4 bg-gray-100">
      <div className="logo font-bold text-xl">DesignBetter</div>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href}
              className={`hover:text-blue-600 transition-colors ${
                pathname === link.href ? 'text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <form action={logoutUser}>
        <button 
        
          onClick={logout}
        
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Cerrar sesión
        </button>
      </form>
    </nav>
  );
}