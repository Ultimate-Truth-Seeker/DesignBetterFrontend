'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAccessToken, clearTokens, saveTokens } from "@/lib/auth"
import { refreshToken } from "@/lib/api"

interface AuthContextType {
  isAuthenticated: boolean
  logout: () => void
  login: (access: string, refresh: string) => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  logout: () => {},
  login: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const access = getAccessToken()
    if (access) {
      setIsAuthenticated(true)
    } else {
      const refresh = localStorage.getItem("refreshToken")
      if (refresh) {
        refreshToken(refresh)
          .then(({ access }) => {
            saveTokens(access, refresh)
            setIsAuthenticated(true)
          })
          .catch(() => {
            clearTokens()
            setIsAuthenticated(false)
          })
      }
    }
  }, [])

  const logout = () => {
    clearTokens()
    setIsAuthenticated(false)
    router.push("/login")
  }
  const login = (access: string, refresh: string) => {
    saveTokens(access, refresh)
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}