'use client'

import { getBaseUrl } from '@/lib/api/base-url'
import { getAccessToken } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function WelcomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleRoleSelection = async (rol: 'cliente' | 'diseñador') => {
    setLoading(true)
    const token = getAccessToken()
    const baseURL = getBaseUrl()

    try {
      const response = await fetch(`${baseURL}/auth/asignar-rol/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Bienvenido a DesignBetter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Para comenzar, selecciona el tipo de cuenta que mejor se adapte a tus necesidades. Esta decisión es{" "}
            <span className="font-semibold text-foreground">permanente</span> y no podrá cambiarse después.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Client Card */}
          <div className="group relative bg-card border-2 border-border rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4">Cliente</h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Explora y personaliza plantillas de ropa creadas por diseñadores profesionales. Crea prendas únicas
              adaptadas a tus medidas y preferencias.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-foreground">Buscar y explorar plantillas de ropa</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-foreground">Personalizar diseños con tus medidas</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-foreground">Realizar pedidos personalizados</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-foreground">Guardar perfiles de medidas corporales</span>
              </div>
            </div>

            <button 
              onClick={() => handleRoleSelection('cliente')}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Continuar como Cliente
            </button>
          </div>

          {/* Designer Card */}
          <div className="group relative bg-card border-2 border-border rounded-2xl p-8 hover:border-accent hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4">Diseñador</h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Crea patrones paramétricos y plantillas de ropa profesionales. Comparte tus diseños con clientes y genera
              ingresos con tu creatividad.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-foreground">Crear patrones de ropa paramétricos</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-foreground">Diseñar plantillas personalizables</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-foreground">Publicar diseños en el marketplace</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-foreground">Gestionar versiones y publicaciones</span>
              </div>
            </div>

            <button 
              onClick={() => handleRoleSelection('diseñador')}
              disabled={loading}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
              Continuar como Diseñador
            </button>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="bg-muted/50 border border-border rounded-lg p-6 flex items-start gap-4">
          <svg
            className="w-6 h-6 text-warning flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Decisión Permanente</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Una vez que selecciones tu tipo de cuenta, no podrás cambiarla en el futuro. Asegúrate de elegir la opción
              que mejor se adapte a tus necesidades. Si tienes dudas, considera qué actividades planeas realizar en la
              plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}