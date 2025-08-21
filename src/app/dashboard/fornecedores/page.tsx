import { Suspense } from 'react';
import { getSuppliers } from '@/lib/suppliers-server';
import SupplierList from '@/components/SupplierList';
import SupplierForm from '@/components/SupplierForm';

// Componente de Carregamento para a lista
function SupplierListSkeleton() {
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

// A página em si
export default async function FornecedoresPage() {
  // Os dados são buscados no servidor, antes da página renderizar
  const suppliers = await getSuppliers();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Fornecedores</h1>
          <p className="mt-2 text-sm text-gray-700">
            Liste, adicione e gerencie os fornecedores do seu marketplace.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {/* O formulário para adicionar novos fornecedores será renderizado aqui */}
          <SupplierForm />
        </div>
      </div>
      
      {/* 
        Usamos Suspense para que a página possa ser renderizada imediatamente 
        enquanto a lista de fornecedores ainda está sendo carregada no servidor.
        Isso melhora a performance percebida pelo usuário.
      */}
      <Suspense fallback={<SupplierListSkeleton />}>
        <SupplierList suppliers={suppliers} />
      </Suspense>
    </div>
  );
}