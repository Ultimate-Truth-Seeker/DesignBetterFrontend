export default function Hero() {
  return (
    <section className="border-b bg-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            DesignBetter
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-gray-600">
            Explora diseños personalizados
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="/login"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Register
            </a>
          </div>
          <div className="mt-7 sm:mt-8 mx-auto w-full max-w-xl">
            <div className="relative">
              <input
                type="text"
                readOnly
                placeholder="Busca plantillas personalizables"
                className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none"
              />
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}