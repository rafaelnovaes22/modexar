import { Fornecedor } from '@/lib/suppliers-server'; // Importando o tipo que definimos

// Este agora é um Server Component por padrão. Mais simples e performático.
// Ele recebe os dados diretamente da página, sem precisar fazer seu próprio fetch.
export default function SupplierList({ suppliers }: { suppliers: Fornecedor[] }) {
  
  if (!suppliers || suppliers.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-500">Nenhum fornecedor encontrado.</p>
        <p className="text-sm text-gray-400">Adicione o primeiro fornecedor no botão acima.</p>
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
                  Nome
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  CNPJ
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Contato (WhatsApp)
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {supplier.nome}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{supplier.cnpj || '-'}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{supplier.contato_whatsapp || '-'}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        supplier.status === 'ativo'
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                          : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                      }`}
                    >
                      {supplier.status}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      Editar<span className="sr-only">, {supplier.nome}</span>
                    </a>
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