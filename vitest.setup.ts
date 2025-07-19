// vitest.setup.ts
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    // añade aquí otros métodos que uses (back, prefetch, etc.)
  }),
  // si usas useSearchParams o usePathname, también móckealos:
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/login',
}))
