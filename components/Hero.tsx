export default function Hero() {
    return (
      <section className="text-center py-20 bg-gradient-to-r from-blue-100 to-blue-200">
        <h2 className="text-4xl font-bold mb-4">Bienvenido a MiProyecto3D</h2>
        <p className="text-lg text-gray-700 mb-8">
          Explora, diseña y administra experiencias visuales en 3D con facilidad.
        </p>
        <div className="space-x-4">
          <a href="/register" className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
            Comienza ahora
          </a>
          <a href="/login" className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
            Ya tengo cuenta
          </a>
        </div>
      </section>
    );
  }