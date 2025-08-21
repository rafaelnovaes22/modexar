'use client';

import { useState, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon } from 'lucide-react';
import { addProduct } from '@/lib/products-server';
import { Fornecedor } from '@/lib/suppliers-server';

// O formulário agora recebe a lista de fornecedores como propriedade
export default function ProductForm({ suppliers }: { suppliers: Fornecedor[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function closeModal() {
    setIsOpen(false);
    setError(null);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    try {
      const newProduct = {
        nome: formData.get('nome') as string,
        preco: parseFloat(formData.get('preco') as string),
        estoque: parseInt(formData.get('estoque') as string, 10),
        fornecedor_id: formData.get('fornecedor_id') as string,
        descricao: formData.get('descricao') as string | null,
      };

      if (!newProduct.nome || !newProduct.preco || !newProduct.fornecedor_id) {
        throw new Error('Nome, preço e fornecedor são obrigatórios.');
      }
      if (isNaN(newProduct.preco) || isNaN(newProduct.estoque)) {
        throw new Error('Preço e estoque devem ser números válidos.');
      }

      await addProduct(newProduct);
      
      formRef.current?.reset();
      closeModal();

    } catch (err: any) {
      console.error('Falha ao adicionar produto:', err);
      setError(err.message || 'Não foi possível adicionar o produto. Tente novamente.');
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusIcon className="inline-block h-4 w-4 mr-1" />
        Adicionar Produto
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* ... (código do overlay e transições do modal, igual ao SupplierForm) ... */}
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Adicionar Novo Produto
                  </Dialog.Title>
                  
                  <form ref={formRef} action={handleSubmit} className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="fornecedor_id" className="block text-sm font-medium text-gray-700">Fornecedor</label>
                      <select
                        name="fornecedor_id"
                        id="fornecedor_id"
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

                    <div className="sm:col-span-2">
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                      <input type="text" name="nome" id="nome" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>

                    <div>
                      <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                      <input type="number" name="preco" id="preco" step="0.01" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>

                    <div>
                      <label htmlFor="estoque" className="block text-sm font-medium text-gray-700">Estoque Inicial</label>
                      <input type="number" name="estoque" id="estoque" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
                      <textarea name="descricao" id="descricao" rows={3} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>

                    {error && (
                      <div className="sm:col-span-2 rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}

                    <div className="sm:col-span-2 mt-6 flex justify-end space-x-2">
                      <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none" onClick={closeModal}>
                        Cancelar
                      </button>
                      <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none">
                        Salvar Produto
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}