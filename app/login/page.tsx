'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import LoginForm from "@/components/auth/LoginForm"


export default function LoginPage() {
 
  const { isAuthenticated } = useAuth()
  const router = useRouter()


  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  

  return (
    <div className="flex justify-center">
    <LoginForm />
    </div>
  )
}