import { PedidoCompleto } from '@/lib/orders-server';

// Função para formatar a data para o padrão brasileiro
function formatDate(dateString: string | null) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Função para formatar um valor numérico para o padrão monetário brasileiro (BRL)
function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Mapeamento de status para estilos de badge
const statusStyles: { [key: string]: string } = {
  aguardando: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  confirmado: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  pago: 'bg-green-50 text-green-700 ring-green-600/20',
  enviado: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  entregue: 'bg-gray-50 text-gray-700 ring-gray-600/20',
  cancelado: 'bg-red-50 text-red-700 ring-red-600/20',
};

export default function OrderList({ orders }: { orders: PedidoCompleto[] }) {
  
  if (!orders || orders.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-500">Nenhum pedido encontrado.</p>
        <p className="text-sm text-gray-400">Crie o primeiro pedido no botão acima.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Data
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Produto
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Fornecedor
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Qtd.
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Valor Total
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                    {formatDate(order.criado_em)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                    {order.produtos?.nome || 'Produto não encontrado'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {order.produtos?.fornecedores?.nome || 'Fornecedor não encontrado'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.quantidade}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatCurrency(order.valor_total as number)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium capitalize ${
                        statusStyles[order.status || 'aguardando']
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}