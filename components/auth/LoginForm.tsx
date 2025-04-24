'use client'

import { useState, useEffect } from "react"
import { loginUser } from "@/lib/api"
import { saveTokens, decodeAccessToken } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import LoginConGoogle from "../LoginConGoogle"

export default function LoginForm() {
    const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [error, setError] = useState("")
      const { isAuthenticated } = useAuth()
      const router = useRouter()
      const { login } = useAuth()
    
    
      useEffect(() => {
        if (isAuthenticated) {
          router.push("/dashboard")
        }
      }, [isAuthenticated, router])
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
    
        try {
          const { access, refresh } = await loginUser({ email, password })
          saveTokens(access, refresh)
          login(access, refresh) // esta función actualiza el estado global
          //router.push("/dashboard") // O redirigir según el rol
          const decoded = decodeAccessToken(access)
    
          if (!decoded) return
    
          
        } catch (err: any) {
          setError(err.message)
        }
      }
    return (
        <div className="">
  <div className="p-4 sm:p-7">
    <div className="text-center">
    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Iniciar sesión</h1>
    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
      ¿No tienes una cuenta?
    <a className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="/register">
      Regístrate aquí
     </a>
    </p>
    </div>

    <div className="mt-5">
      
      <LoginConGoogle/>

      <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">O</div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-y-4">
          {/* Form Group */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div>
          <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Correo electrónico</label>
            <div className="relative">
              <input type="email" id="email" name="email" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" value={email}
          onChange={(e) => setEmail(e.target.value)}/>
              <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </div>
            </div>
            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Por favor, introduce un correo electrónico válido para poder contactarte</p>
          </div>
          {/* End Form Group */}

          {/* Form Group */}
          <div>
            <div className="flex flex-wrap justify-between items-center gap-2">
            <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Contraseña</label>
            <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="/forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="relative">
              <input type="password" id="password" name="password" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" value={password}
          onChange={(e) => setPassword(e.target.value)}/>
              <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </div>
            </div>
            <p className="hidden text-xs text-red-600 mt-2" id="password-error">Se requieren al menos 8 caracteres</p>
          </div>
          {/* End Form Group */}

          {/* Checkbox */}
          <div className="flex items-center">
            <div className="flex">
              <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
            </div>
            <div className="ms-3">
            <label htmlFor="remember-me" className="text-sm dark:text-white">Recuérdame</label>
            </div>
          </div>
          {/* End Checkbox */}

          <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Iniciar sesión</button>
        </div>
      </form>
      {/* End Form */}
    </div>
  </div>
</div>
    )
}
