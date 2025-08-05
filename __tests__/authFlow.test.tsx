import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';
import { GoogleOAuthProvider } from '@react-oauth/google'
import LoginForm from '@/components/auth/LoginForm';
import ActivatePage from '@/app/activate/[token]/page';


describe('Flujo de registro', () => {
  it('permite registrarse, activar cuenta y entrar al dashboard', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <GoogleOAuthProvider clientId="test-client-id">
            <RegisterForm />
        </GoogleOAuthProvider>
      </MemoryRouter>,
    );

    /* Completar formulario de registro */
    await user.type(screen.getByLabelText(/correo electrónico/i), 'cliente@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'Segura123!');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), 'Segura123!');
    await user.click(screen.getByRole('checkbox', { name: /acepto/i }));
    await user.click(screen.getByRole('button', { name: /registrarse/i }));
    
  });
});

describe('Flujo de activacion', () => {
  it('permite registrarse, activar cuenta y entrar al dashboard', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <GoogleOAuthProvider clientId="test-client-id">
            <ActivatePage params={{
                    token: 'token'
                }} />
        </GoogleOAuthProvider>
      </MemoryRouter>,
    );
 
    await waitFor(() =>
      expect(screen.getByText(/Activación de cuenta/i)).toBeTruthy(),
    );
    
  });
});

describe('Flujo de login', () => {
  it('permite registrarse, activar cuenta y entrar al dashboard', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <GoogleOAuthProvider clientId="test-client-id">
            <LoginForm />
        </GoogleOAuthProvider>
      </MemoryRouter>,
    );

     await user.type(screen.getByLabelText(/correo electrónico/i), 'cliente@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'Segura123!');
    await user.click(screen.getByRole('button', { name: /entrar|iniciar sesión/i }));

  });
});