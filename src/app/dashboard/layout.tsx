import Link from 'next/link';
import { signOut } from '@/lib/auth-server';
import { Home, Package, Users, LogOut } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra Lateral */}
      <aside className="w-64 flex-shrink-0 bg-white border-r">
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold text-xl text-indigo-600">Marketplace Brás</h2>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200">
              <Home className="w-5 h-5 mr-3" />
              Início
            </Link>
            <Link href="/dashboard/fornecedores" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200">
              <Users className="w-5 h-5 mr-3" />
              Fornecedores
            </Link>
            <Link href="/dashboard/produtos" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200">
              <Package className="w-5 h-5 mr-3" />
              Produtos
            </Link>
          </nav>
          <div className="px-4 py-4 border-t">
            {/* Formulário de Logout */}
            <form action={signOut}>
              <button className="w-full flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200">
                <LogOut className="w-5 h-5 mr-3" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {children}
        </div>
      </main>
    </div>
  );
}
