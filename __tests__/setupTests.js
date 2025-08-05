import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { server } from './msw/server';

/* ------------------------------------------------------------------ */
/*  ⛑  Evitar que jsdom intente navegar fuera del documento actual    */
/* ------------------------------------------------------------------ */
Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    ...window.location,
    // Stub de métodos que provocarían navegación real
    assign:  vi.fn(),
    replace: vi.fn(),
    reload:  vi.fn(),
  },
});

/* Si tus componentes usan window.location.href = '…'                  */
/* (setters), “location.href = …” ya no producirá error:               */
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: window.location.href,
});
/* ------------------------------------------------------------------ */
vi.mock('next/navigation', () => require('next-router-mock'));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
// Arranca/parar MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());