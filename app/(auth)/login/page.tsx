'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import LoginForm from "@/components/auth/LoginForm"
import { decodeAccessToken, getAccessToken } from "@/lib/auth-client"
import { refreshToken } from "@/lib/api"


export default function LoginPage() {
 
  const { isAuthenticated, login } = useAuth()
  const router = useRouter()


  useEffect(() => {
    if (isAuthenticated) {
      const refresh = localStorage.getItem("refreshToken")
      if (refresh) {
        refreshToken(refresh)
          .then(({ access }) => {
            //console.log(decodeAccessToken(access))
            login(access, refresh)
          })
          .catch(() => {
            
          })
      }
    }
  }, [isAuthenticated, router])

  

  return (
    <div className="flex justify-center">
    <LoginForm />
    </div>
  )
}