'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutUser } from '@/lib/auth/actions';

export default function ClientNavbar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard/cliente', label: 'Inicio' },
    { href: '/dashboard/cliente/pedidos', label: 'Mis Pedidos' },
    { href: '/dashboard/cliente/favoritos', label: 'Favoritos' },
  ];

  return (
    <nav className="client-navbar">
      <div className="logo">DesignBetter</div>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <form action={logoutUser}>
        <button type="submit">Cerrar sesión</button>
      </form>
    </nav>
  );
}