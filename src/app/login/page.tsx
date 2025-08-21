import Link from 'next/link';
import { signIn } from '@/lib/auth-server';

export default async function LoginPage({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Acessar Painel</h1>
        
        {/* O formulário agora chama a Server Action signIn */}
        <form action={signIn} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
          
          {/* Exibe mensagens de erro ou sucesso */}
          {searchParams.message && (
            <div className={`p-4 text-center text-sm rounded-md ${
              searchParams.message.includes('sucesso') 
                ? 'text-green-600 bg-green-50' 
                : 'text-red-600 bg-red-50'
            }`}>
              {searchParams.message}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}