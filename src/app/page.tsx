import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Marketplace Brás</h1>
          <p className="text-gray-600 mt-2">Conectando fornecedores do Brás com lojistas de todo o Brasil</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao maior marketplace do Brás
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre os melhores produtos com preços direto da fábrica. 
            Fornecedores confiáveis e entrega rápida para todo o Brasil.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Para Lojistas</h3>
            <p className="text-gray-600 mb-6">
              Acesse milhares de produtos com preços especiais e aumente sua margem de lucro.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-green-600">
                <span className="mr-2">✓</span>
                <span>Preços direto da fábrica</span>
              </div>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✓</span>
                <span>Entrega rápida</span>
              </div>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✓</span>
                <span>Variedade de produtos</span>
              </div>
            </div>
            <Link 
              href="/cadastro" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block"
            >
              Criar Conta
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Para Fornecedores</h3>
            <p className="text-gray-600 mb-6">
              Expanda seus negócios vendendo para lojistas de todo o Brasil.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-green-600">
                <span className="mr-2">✓</span>
                <span>Alcance nacional</span>
              </div>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✓</span>
                <span>Gestão simplificada</span>
              </div>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✓</span>
                <span>Pagamentos seguros</span>
              </div>
            </div>
            <Link 
              href="/dashboard" 
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors inline-block"
            >
              Área do Fornecedor
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Já tem uma conta?</p>
          <Link 
            href="/login" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Fazer Login
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Marketplace Brás. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
