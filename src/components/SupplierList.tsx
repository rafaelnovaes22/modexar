'use client';

import { useEffect, useState } from 'react';

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };
    fetchSuppliers();
  }, []);

  if (loading) {
    return <div>Carregando fornecedores...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNPJ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td className="px-6 py-4 whitespace-nowrap">{supplier.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{supplier.cnpj}</td>
              <td className="px-6 py-4 whitespace-nowrap">{supplier.contato_whatsapp}</td>
              <td className="px-6 py-4 whitespace-nowrap">{supplier.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{supplier.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
