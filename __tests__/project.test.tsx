import { describe, expect, it, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'
import ClientNavbar from '@/components/clients/ClientNavbar'
import { DesignerNavbar } from '@/components/designer/DesignerNavbar'

describe('Navbar', () => {
  it('debe renderizar los enlaces del menú', () => {
    render(<Navbar />)
    expect(screen.getByText('Registrarse')).toBeTruthy()
    expect(screen.getByText('Iniciar sesión')).toBeTruthy()
  })
})


describe('Dashboards', () => {
  it('muestra menu de cliente', () => {
    render(<ClientNavbar />)
    expect(screen.getByText('DesignBetter')).toBeTruthy()
    expect(screen.getByText('Cerrar sesión')).toBeTruthy()
  })


it('muestra menu de diseñador', () => {
    render(<DesignerNavbar/>)
    expect(screen.getByText('Inicio')).toBeTruthy()
    expect(screen.getByText('Cerrar sesión')).toBeTruthy()
  })
})