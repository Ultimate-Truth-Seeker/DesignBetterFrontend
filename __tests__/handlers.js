import { rest } from 'msw';

export const handlers = [
  // Registro
  rest.post('/auth/register', (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  // Activación
  rest.get('/auth/activate/token', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ detail: 'Cuenta activada' }));
  }),

  // Login
  rest.post('/auth/token/', (req, res, ctx) => {
    const { correo_electronico } = req.body;
    return res(
      ctx.status(200),
      ctx.json({
        access: 'fake-access',
        refresh: 'fake-refresh',
        email: correo_electronico,
        nombre: 'Cliente Demo',
        rol: 'cliente',
      }),
    );
  }),
];