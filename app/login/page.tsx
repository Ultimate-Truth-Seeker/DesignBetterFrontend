'use client'

import { useState, useEffect } from "react"
import { loginUser } from "@/lib/api"
import { saveTokens } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"


export default function LoginPage() {
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
      router.push("/dashboard") // O redirigir según el rol
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}