'use client';

import { useEffect, useState } from 'react';

export default function DashboardSummary() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const dashboardData = await response.json();
          setData(dashboardData);
        } else {
          console.error('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando dados do dashboard...</div>;
  }

  if (!data) {
    return <div>Erro ao carregar dados do dashboard</div>;
  }

  return (
    <div className="space-y-6">
      {/* Métricas principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800">Fornecedores</h3>
          <p className="text-2xl font-bold text-blue-900">{data.totalSuppliers}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-sm font-medium text-green-800">Produtos</h3>
          <p className="text-2xl font-bold text-green-900">{data.totalProducts}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="text-sm font-medium text-purple-800">Pedidos Total</h3>
          <p className="text-2xl font-bold text-purple-900">{data.totalOrders}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-sm font-medium text-yellow-800">Pendentes</h3>
          <p className="text-2xl font-bold text-yellow-900">{data.pendingOrders}</p>
        </div>
      </div>

      {/* Métricas financeiras */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">Faturamento Total</h3>
          <p className="text-3xl font-bold text-green-600">R$ {data.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">Custos Totais</h3>
          <p className="text-3xl font-bold text-red-600">R$ {data.totalCosts.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">Lucro Total</h3>
          <p className="text-3xl font-bold text-blue-600">R$ {data.totalProfit.toFixed(2)}</p>
        </div>
      </div>

      {/* Produtos com estoque baixo */}
      <div className="bg-white rounded-lg shadow-md border p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Produtos com Estoque Baixo</h3>
        {data.lowStockProducts.length > 0 ? (
          <div className="space-y-2">
            {data.lowStockProducts.map((product: any) => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-md border border-yellow-200">
                <span className="font-medium">{product.nome}</span>
                <span className="text-sm bg-yellow-200 px-2 py-1 rounded">
                  Estoque: {product.estoque}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Todos os produtos têm estoque adequado!</p>
        )}
      </div>
    </div>
  );
}
