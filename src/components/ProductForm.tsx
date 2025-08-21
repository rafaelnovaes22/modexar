'use client';

import { useState, useEffect } from 'react';
export default function ProductForm() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/fornecedores');
        if (response.ok) {
          const data = await response.json();
          setSuppliers(data);
        } else {
          console.error('Failed to fetch suppliers');
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque, 10),
      fornecedor_id: fornecedorId,
    };
    
    try {
      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (response.ok) {
        alert('Produto cadastrado com sucesso!');
        // Limpar o formulário
        setNome('');
        setPreco('');
        setEstoque('');
        setFornecedorId('');
      } else {
        alert('Erro ao cadastrar produto!');
      }
    } catch (error) {
      alert('Erro ao cadastrar produto!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço</label>
        <input
          type="number"
          id="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="estoque" className="block text-sm font-medium text-gray-700">Estoque Inicial</label>
        <input
          type="number"
          id="estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="fornecedor" className="block text-sm font-medium text-gray-700">Fornecedor</label>
        <select
          id="fornecedor"
          value={fornecedorId}
          onChange={(e) => setFornecedorId(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Selecione um fornecedor</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.nome}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Salvar Produto
      </button>
    </form>
  );
}
