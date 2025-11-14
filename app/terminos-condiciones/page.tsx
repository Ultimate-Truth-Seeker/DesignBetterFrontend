export default function TerminosCondiciones() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Términos y Condiciones
        </h1>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder y utilizar esta plataforma, usted acepta estar sujeto a estos
              Términos y Condiciones. Si no está de acuerdo con alguna parte de estos
              términos, no debe utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Uso de la Plataforma
            </h2>
            <p>
              Esta plataforma está diseñada para conectar clientes con diseñadores de
              moda y facilitar la creación de prendas personalizadas. Los usuarios se
              comprometen a:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Proporcionar información veraz y actualizada</li>
              <li>Mantener la confidencialidad de sus credenciales de acceso</li>
              <li>No utilizar la plataforma para fines ilegales o no autorizados</li>
              <li>Respetar los derechos de propiedad intelectual de los diseñadores</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Registro de Cuenta
            </h2>
            <p>
              Para utilizar ciertas funciones de la plataforma, debe crear una cuenta.
              Usted es responsable de mantener la seguridad de su cuenta y contraseña.
              Nos reservamos el derecho de suspender o cancelar cuentas que violen
              estos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4. Pedidos y Pagos
            </h2>
            <p>
              Los pedidos realizados a través de la plataforma están sujetos a
              disponibilidad y aceptación por parte del diseñador. Los precios y
              condiciones de pago se establecerán claramente antes de confirmar
              cualquier pedido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Propiedad Intelectual
            </h2>
            <p>
              Todos los diseños, patrones y contenido creativo en la plataforma son
              propiedad de sus respectivos creadores. Los usuarios no pueden copiar,
              reproducir o distribuir este contenido sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              6. Privacidad de Datos
            </h2>
            <p>
              Nos comprometemos a proteger su información personal de acuerdo con
              nuestra Política de Privacidad. Al utilizar la plataforma, usted acepta
              la recopilación y uso de información según lo descrito en dicha política.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7. Limitación de Responsabilidad
            </h2>
            <p>
              La plataforma se proporciona "tal cual" sin garantías de ningún tipo.
              No nos hacemos responsables de daños directos, indirectos, incidentales
              o consecuentes que resulten del uso o la imposibilidad de usar nuestros
              servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              8. Modificaciones
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos y Condiciones en
              cualquier momento. Los cambios entrarán en vigor inmediatamente después
              de su publicación en la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9. Contacto
            </h2>
            <p>
              Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos
              a través de los canales de comunicación disponibles en la plataforma.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-neutral-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Última actualización: {new Date().toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/register"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al registro
          </a>
        </div>
      </div>
    </div>
  );
}