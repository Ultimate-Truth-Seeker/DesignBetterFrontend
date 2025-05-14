'use client'

import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Bienvenido a DesignBetter</h1>
      <h2 className="mb-4">Por favor, selecciona tu rol:</h2>
      <div className="space-x-4">
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-2 rounded bg-blue-600 text-white"
        >
          Cliente
        </button>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-2 rounded bg-green-600 text-white"
        >
          Diseñador
        </button>
      </div>
    </div>
  )
}

