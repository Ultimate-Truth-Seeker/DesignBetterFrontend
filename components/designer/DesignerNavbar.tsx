import { Link, useLocation } from "react-router-dom";

// Opciones del menú (algunas deshabilitadas temporalmente)
const menuItems = [
  {
    name: "Inicio",
    path: "/designer",
    enabled: true,
    icon: "🏠",
  },
  {
    name: "Biblioteca de Telas",
    path: "/designer/fabrics",
    enabled: true,
    icon: "🧵",
  },
  {
    name: "Editor de Patrones",
    path: "/designer/patterns",
    enabled: false,
    icon: "✂️",
    disabledMessage: "Próximamente", 
  },
  {
    name: "Paleta de Colores",
    path: "/designer/colors",
    enabled: false,
    icon: "🎨",
  },
];

export const DesignerNavbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white p-4 border-b">
      <div className="max-w-6xl mx-auto flex items-center gap-8">
        <h1 className="text-xl font-bold text-rose-600">Panel del Diseñador</h1>
        
        <ul className="flex gap-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.enabled ? (
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 p-2 rounded ${
                    pathname === item.path ? "bg-rose-50 text-rose-600" : "hover:bg-gray-50"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ) : (
                <div
                  className="flex items-center gap-2 p-2 text-gray-400 cursor-not-allowed"
                  title={item.disabledMessage}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};