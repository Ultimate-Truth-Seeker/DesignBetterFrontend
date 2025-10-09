'use client'

import { useAuth } from "@/components/AuthProvider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      //router.push("/login")
    }
  }, [isAuthenticated, router])

  // Mientras decidimos si está logueado o no, no mostramos nada
  if (!isAuthenticated) return <><h1>Loading</h1></>

  return <>{children}</>
}