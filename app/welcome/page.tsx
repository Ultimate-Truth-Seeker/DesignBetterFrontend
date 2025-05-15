'use client'

import { getAccessToken } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function WelcomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleRoleSelection = async (rol: 'cliente' | 'diseñador') => {
    setLoading(true)
    const token = getAccessToken()

    try {
      const response = await fetch('http://localhost:8000/auth/asignar-rol/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rol }),
      })

      if (response.ok) {
        router.push('/login')
      } else {
        const error = await response.json()
        console.error('Error asignando rol:', error)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    } finally {
      setLoading(false)
      
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Bienvenido a DesignBetter</h1>
      <h2 className="mb-4">Por favor, selecciona tu rol:</h2>
      <div className="space-x-4">
      <button
          onClick={() => handleRoleSelection('cliente')}
          className="px-6 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          disabled={loading}
        >
          Cliente
        </button>
        <button
          onClick={() => handleRoleSelection('diseñador')}
          className="px-6 py-2 rounded bg-green-600 text-white disabled:opacity-50"
          disabled={loading}
        >
          Diseñador
        </button>
      </div>
    </div>
  )
}

