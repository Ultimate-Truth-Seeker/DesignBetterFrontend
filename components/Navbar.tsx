"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { DecodedToken } from "@/lib/auth-client"
import { useUser } from "@/lib/auth-store"
import { useAuth } from "./AuthProvider"

// Mock user data - replace with your actual auth logic


interface NavbarProps {
  user?: DecodedToken | null
}

export function Navbar({ user = useUser() }: NavbarProps) {
  const { logout } = useAuth()
  return (
    <nav className="border-b bg-background px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-80">
            DesignBetter
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          {!user ? (
            // Unauthenticated navbar
            <>
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Inicio
              </Link>
              <Link href="/template/search/" className="text-muted-foreground hover:text-foreground transition-colors">
                Buscar Plantillas
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Link href="/register">Register</Link></Button>
              </div>
            </>
          ) : (
            // Authenticated navbar
            <>
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Inicio
              </Link>

              {user.rol === "cliente" ? (
                <>
                  <Link href="/template/search/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Buscar Plantillas
                  </Link>
                  <Link href="/dashboard/cliente/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/cliente/pedidos/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Mis Pedidos
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
                    Mis Plantillas
                  </Link>
                  <Link href="/patterns" className="text-muted-foreground hover:text-foreground transition-colors">
                    Mis Patrones
                  </Link>
                  <Link href="/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                    Mis Pedidos
                  </Link>
                </>
              )}

              <Link href="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
                Mensajes
              </Link>

              {/* User Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.nombre} />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {user.nombre.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
