// app/welcome/layout.tsx
import ProtectedRoute from '@/components/ProtectedRoute'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Bienvenido'
}

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div>
        {children}
      </div>
    </ProtectedRoute>
  )
}

