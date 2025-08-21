'use client';

import { useState, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon } from 'lucide-react';
import { addSupplier } from '@/lib/suppliers-server';

export default function SupplierForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function closeModal() {
    setIsOpen(false);
    setError(null); // Limpa o erro ao fechar
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    try {
      // Mapeia os dados do formulário para o formato esperado pela função addSupplier
      const newSupplier = {
        nome: formData.get('nome') as string,
        cnpj: formData.get('cnpj') as string | null,
        contato_whatsapp: formData.get('contato_whatsapp') as string | null,
        email: formData.get('email') as string | null,
        endereco: formData.get('endereco') as string | null,
      };

      // Validação simples
      if (!newSupplier.nome) {
        throw new Error('O nome do fornecedor é obrigatório.');
      }

      await addSupplier(newSupplier);
      
      // Limpa o formulário e fecha o modal em caso de sucesso
      formRef.current?.reset();
      closeModal();

    } catch (err) {
      console.error('Falha ao adicionar fornecedor:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Não foi possível adicionar o fornecedor. Tente novamente.');
      }
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
        Adicionar Fornecedor
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Adicionar Novo Fornecedor
                  </Dialog.Title>
                  
                  {/* A Server Action é chamada aqui */}
                  <form ref={formRef} action={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                      <input
                        type="text"
                        name="nome"
                        id="nome"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">CNPJ</label>
                      <input
                        type="text"
                        name="cnpj"
                        id="cnpj"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="contato_whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp</label>
                      <input
                        type="text"
                        name="contato_whatsapp"
                        id="contato_whatsapp"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    {error && (
                      <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}

                    <div className="mt-6 flex justify-end space-x-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                      >
                        Salvar Fornecedor
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