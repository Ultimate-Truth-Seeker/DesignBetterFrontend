// components/LoginConGoogle.tsx
'use client'

import { GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import { useAuth } from "@/components/AuthProvider"
import { saveTokens } from "@/lib/auth-client"



export default function LoginConGoogle() {
  const router = useRouter()
  const { login } = useAuth()

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const token = credentialResponse.credential

          const response = await fetch('http://localhost:8000/auth/social/google/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ access_token: token }),
          })

          const data = await response.json()

          if (response.ok) {
            saveTokens(data.access, data.refresh)
            login(data.access, data.refresh)
            //console.log('Respuesta del backend:', data) // 👈 Asegúrate que contenga "access" y "refresh"

            //router.push('/dashboard')  // redirige al home del usuario
          } else {
            console.error('❌ Error al autenticar en backend:', data)
            alert('Error al iniciar sesión con Google')
          }
        }}
        onError={() => {
          console.log('❌ Error en el widget de Google')
        }}
      />
    </div>
  )
}
