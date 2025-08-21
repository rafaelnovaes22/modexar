'use client';

import { useState, useEffect } from 'react';
export default function OrderForm() {
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Mock products for now
      const mockProducts = [
        { id: '1', nome: 'Produto A', fornecedores: { nome: 'Fornecedor A' } },
        { id: '2', nome: 'Produto B', fornecedores: { nome: 'Fornecedor B' } }
      ];
      setProducts(mockProducts);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock order creation for now
    alert('Pedido criado com sucesso!');
    // Limpar o formulário
    setProdutoId('');
    setQuantidade('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="produto" className="block text-sm font-medium text-gray-700">Produto</label>
        <select
          id="produto"
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.nome} ({product.fornecedores.nome})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade</label>
        <input
          type="number"
          id="quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Criar Pedido
      </button>
    </form>
  );
}
