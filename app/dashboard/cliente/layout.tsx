import { Inter } from 'next/font/google';
import { AuthProvider } from '@/providers/auth';
import { validateRole } from '@/lib/auth';
import ClientNavbar from '@/components/clients/ClientNavbar';
import type { Metadata } from 'next';
import { FloatingChat } from '@/components/common/FloatingChat';
import FashionChatbot from '../chatbot/chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DesignBetter - Área de Cliente',
  description: 'Sigue y personaliza tus pedidos de moda',
};

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verifica si el usuario es cliente (redirige si no)
  //await validateRole('CLIENTE');

  return (
    //<html lang="es" className="bg-gray-50">
      //<body className={`${inter.className} client-theme`}>
        //<AuthProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto p-4 md:p-6 relative">
              {children}
              <FashionChatbot/>
            </main>
            <footer className="bg-white py-4 border-t">
              <p className="text-center text-gray-600">
                © 2023 DesignBetter - Área de Cliente
              </p>
            </footer>   
          </div>
      //  </AuthProvider>
    //  </body>
  //  </html>
  );
}