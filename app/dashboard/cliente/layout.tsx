//import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import FashionChatbot from '../chatbot/chatbot';

//const inter = Inter({ subsets: ['latin'] });

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
            <div className="flex-1 container mx-auto p-4 md:p-6 relative">
              {children}
              <FashionChatbot/>
            </div>
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