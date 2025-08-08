'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import RegisterForm from "@/components/auth/RegisterForm"


export default function RegisterPage() {
  

  

  return (
    <div className="flex justify-center">
      
      <RegisterForm/>
    </div>

  )
}