// app/welcome/layout.tsx
import { ReactNode } from 'react'

export const metadata = {
  title: 'Bienvenido'
}

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}

