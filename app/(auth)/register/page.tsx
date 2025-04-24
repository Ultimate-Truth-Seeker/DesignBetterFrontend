'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import RegisterForm from "@/components/auth/RegisterForm"


export default function RegisterPage() {
  
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  

  return (
    <div className="flex justify-center">
      
      <RegisterForm/>
    </div>

  )
}