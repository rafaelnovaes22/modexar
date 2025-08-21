import { Suspense } from 'react';
import { getProducts } from '@/lib/products-server';
import { getSuppliers } from '@/lib/suppliers-server';
import ProductList from '@/components/ProductList';
import ProductForm from '@/components/ProductForm';

// Componente de Carregamento para a lista de produtos
function ProductListSkeleton() {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="h-96 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// A página de Produtos
export default async function ProdutosPage() {
  // Para otimizar, buscamos os dados de produtos e fornecedores em paralelo
  const [products, suppliers] = await Promise.all([
    getProducts(),
    getSuppliers() // Precisamos dos fornecedores para o formulário de adição
  ]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Produtos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Liste, adicione e gerencie os produtos do seu marketplace.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {/* Passamos a lista de fornecedores para o formulário */}
          <ProductForm suppliers={suppliers} />
        </div>
      </div>
      
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={products} />
      </Suspense>
    </div>
  );
}