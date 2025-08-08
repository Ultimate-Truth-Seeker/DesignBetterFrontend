'use client'

import { useAuth } from "@/components/AuthProvider"
import { refreshToken } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
      <div className="relative min-h-screen flex flex-col md:flex-row">
        {/* Form section */}
        <div className="flex-1 flex items-center justify-center px-6 py-8 md:px-12 lg:px-16">
          <main className="w-full max-w-md">{children}</main>
        </div>
  
        {/* Background image section */}
        <div className="hidden md:block md:w-1/2 lg:w-7/12 bg-cover bg-center" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')" 
        }}></div>
      </div>
    );
  }