'use client';

import { useEffect, useState } from 'react';
export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Mock products for now
      const mockProducts = [
        { 
          id: '1', 
          nome: 'Produto A', 
          preco: 29.99, 
          estoque: 100,
          fornecedores: { nome: 'Fornecedor A' }
        },
        { 
          id: '2', 
          nome: 'Produto B', 
          preco: 49.99, 
          estoque: 50,
          fornecedores: { nome: 'Fornecedor B' }
        }
      ];
      setProducts(mockProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.fornecedores.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.preco}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.estoque}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
