import { Suspense } from 'react';
import { getOrders } from '@/lib/orders-server';
import { getProducts } from '@/lib/products-server';
import OrderList from '@/components/OrderList';
import OrderForm from '@/components/OrderForm';

// Componente de Carregamento para a lista de pedidos
function OrderListSkeleton() {
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

// A página de Pedidos
export default async function PedidosPage() {
  // Buscamos os dados de pedidos e produtos em paralelo para otimizar o carregamento
  const [orders, products] = await Promise.all([
    getOrders(),
    getProducts() // Produtos são necessários para o formulário de novo pedido
  ]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Pedidos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Visualize e gerencie todos os pedidos realizados no marketplace.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {/* Passamos a lista de produtos para o formulário */}
          <OrderForm products={products} />
        </div>
      </div>
      
      <Suspense fallback={<OrderListSkeleton />}>
        <OrderList orders={orders} />
      </Suspense>
    </div>
  );
}