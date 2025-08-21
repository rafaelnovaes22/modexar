'use client';

import { useState } from 'react';
export default function SupplierForm() {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [contato_whatsapp, setContatoWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supplierData = { nome, cnpj, contato_whatsapp, email, endereco };
    
    try {
      const response = await fetch('/api/fornecedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });
      
      if (response.ok) {
        alert('Fornecedor cadastrado com sucesso!');
        // Limpar o formulário
        setNome('');
        setCnpj('');
        setContatoWhatsapp('');
        setEmail('');
        setEndereco('');
      } else {
        alert('Erro ao cadastrar fornecedor!');
      }
    } catch (error) {
      alert('Erro ao cadastrar fornecedor!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
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
        <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">CNPJ</label>
        <input
          type="text"
          id="cnpj"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="contato_whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp</label>
        <input
          type="text"
          id="contato_whatsapp"
          value={contato_whatsapp}
          onChange={(e) => setContatoWhatsapp(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
        <input
          type="text"
          id="endereco"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Salvar Fornecedor
      </button>
    </form>
  );
}
