'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import LoginForm from "@/components/auth/LoginForm"
import { decodeAccessToken, getAccessToken } from "@/lib/auth-client"
import { refreshToken } from "@/lib/api"


export default function LoginPage() {

  return (
    <div className="flex justify-center">
    <LoginForm />
    </div>
  )
}