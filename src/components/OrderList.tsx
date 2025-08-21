'use client';

import { useEffect, useState } from 'react';
export default function OrderList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    // Mock orders for now
    const mockOrders = [
      { 
        id: '1', 
        quantidade: 5, 
        status: 'aguardando',
        produtos: { nome: 'Produto A', fornecedores: { nome: 'Fornecedor A' } }
      },
      { 
        id: '2', 
        quantidade: 3, 
        status: 'pago',
        produtos: { nome: 'Produto B', fornecedores: { nome: 'Fornecedor B' } }
      }
    ];
    setOrders(mockOrders);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleReceiveOrder = async (orderId: string) => {
    // Mock order receiving
    alert('Pedido recebido com sucesso!');
    fetchOrders(); // Refresh the list
  };

  if (loading) {
    return <div>Carregando pedidos...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">{order.produtos.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.produtos.fornecedores.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.quantidade}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.status === 'aguardando' && (
                  <button
                    onClick={() => handleReceiveOrder(order.id)}
                    className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Receber
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
