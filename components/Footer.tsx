import { Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 px-4 py-8 mt-12 border-t border-gray-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Marca y descripción */}
        <div className="space-y-2">
          <p className="text-2xl font-bold text-black">DesignBetter</p>
          <p className="max-w-md text-sm text-gray-600">
            Crea, personaliza y gestiona tus plantillas de diseño de forma sencilla y colaborativa.
          </p>
          <p className="text-[11px] text-gray-500">
            © {year} DesignBetter. Todos los derechos reservados.
          </p>
        </div>

        {/* Navegación básica + redes */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          <nav className="flex flex-wrap gap-4 text-sm">
            <a href="/" className="text-gray-600 hover:text-black">
              Inicio
            </a>
            <a href="/template/search" className="text-gray-600 hover:text-black">
              Buscar plantillas
            </a>
            <a href="/patterns" className="text-gray-600 hover:text-black">
              Patrones
            </a>
            <a href="/terminos-condiciones" className="text-gray-600 hover:text-black">
              Términos y condiciones
            </a>
          </nav>

          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-black">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-black">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-600 hover:text-black">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
