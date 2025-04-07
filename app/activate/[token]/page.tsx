'use client'

import { useEffect, useState } from "react"
import { activateAccount } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function ActivatePage({ params }: { params: { token: string } }) {
  const [message, setMessage] = useState("Validando token de activación...")
  const router = useRouter()

  useEffect(() => {
    async function activate() {
      try {
        await activateAccount(params.token)
        setMessage("Cuenta activada exitosamente. Redirigiendo al login...")
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } catch (err: any) {
        setMessage(err.message)
      }
    }

    activate()
  }, [params.token, router])

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded-xl shadow-md text-center">
      <h1 className="text-xl font-semibold mb-4">Activación de cuenta</h1>
      <p>{message}</p>
    </div>
  )
}