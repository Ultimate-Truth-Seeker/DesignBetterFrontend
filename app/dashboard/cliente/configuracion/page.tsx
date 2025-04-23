import { updateUserProfile } from '@/lib/api/clientes';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Divider } from '@/components/ui/Divider';

export default async function ConfiguracionPage() {
  //const user = await getCurrentUser(); // Obtener datos del usuario
   const user = {
    id: '',
       name: '',
       email: '',
       role: '',
       
   }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configuración de tu cuenta</h1>

      {/* Sección 1: Información básica */}
      <Card title="Datos personales">
        <form 
          action={async (formData) => {
            'use server';
            await updateUserProfile(formData);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            label="Nombre completo"
            name="fullName"
            defaultValue={user?.name || ''}
          />
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            defaultValue={user?.email || ''}
            disabled
          />
          <div className="md:col-span-2">
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </Card>

      {/* Sección 2: Preferencias */}
      <Card title="Preferencias">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label>Recibir notificaciones por email</label>
            <input 
              type="checkbox" 
              defaultChecked={user?.preferences?.notifications || false}
              className="toggle"
              name="notifications"
            />
          </div>
          <Divider />
          <div className="flex items-center justify-between">
            <label>Modo oscuro</label>
            <input 
              type="checkbox" 
              defaultChecked={user?.preferences?.darkMode || false}
              className="toggle"
              name="darkMode"
            />
          </div>
        </div>
      </Card>

      {/* Sección 3: Zona peligrosa */}
      <Card title="Zona peligrosa" danger>
        <div className="space-y-4">
          <Button variant="outline" //onClick={() => {/* Lógica para cambiar contraseña */}}>
            >Cambiar contraseña
          </Button>
          <Button variant="danger" //onClick={() => {/* Lógica para eliminar cuenta */}}>
            >Eliminar cuenta
          </Button>
        </div>
      </Card>
    </div>
  );
}