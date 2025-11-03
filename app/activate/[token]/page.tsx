'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { activateAccount } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function ActivatePage() {
  const params = useParams();
  const [message, setMessage] = useState("Validando token de activación...")
  const router = useRouter()

  useEffect(() => {
    async function activate() {
      try {
        await activateAccount(params?.token as string)
        setMessage("Cuenta activada exitosamente. Redirigiendo al login...")
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } catch (err) {
        if (err) {}
        setMessage("Hubo un error")//err.message)
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