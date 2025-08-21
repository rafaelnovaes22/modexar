'use client';

import { useState, useRef, Fragment, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon } from 'lucide-react';
import { addOrder } from '@/lib/orders-server';
import { ProdutoComFornecedor } from '@/lib/products-server';

// O formulário agora recebe a lista de produtos como propriedade
export default function OrderForm({ products }: { products: ProdutoComFornecedor[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Estados para calcular o valor total dinamicamente
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  function closeModal() {
    setIsOpen(false);
    setError(null);
    // Reseta os estados ao fechar
    setSelectedProductId('');
    setQuantity(1);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Calcula o valor total com base no produto selecionado e na quantidade
  const totalValue = useMemo(() => {
    const product = products.find(p => p.id === selectedProductId);
    if (!product || !product.preco) return 0;
    return (product.preco as number) * quantity;
  }, [selectedProductId, quantity, products]);

  async function handleSubmit(formData: FormData) {
    const product = products.find(p => p.id === selectedProductId);
    if (!product) {
      setError('Produto selecionado não é válido.');
      return;
    }

    try {
      const newOrder = {
        lojista_nome: formData.get('lojista_nome') as string,
        produto_id: selectedProductId,
        quantidade: quantity,
        valor_unitario: product.preco as number,
        valor_total: totalValue,
        status: 'aguardando' as const, // Status inicial
      };

      if (!newOrder.lojista_nome || !newOrder.produto_id || newOrder.quantidade <= 0) {
        throw new Error('Todos os campos são obrigatórios e a quantidade deve ser maior que zero.');
      }

      await addOrder(newOrder);
      
      formRef.current?.reset();
      closeModal();

    } catch (err) {
      console.error('Falha ao criar pedido:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Não foi possível criar o pedido. Tente novamente.');
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
        Novo Pedido
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* ... (código do overlay e transições do modal) ... */}
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black bg-opacity-25" /></Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Criar Novo Pedido
                  </Dialog.Title>
                  
                  <form ref={formRef} action={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="lojista_nome" className="block text-sm font-medium text-gray-700">Nome do Lojista/Comprador</label>
                      <input type="text" name="lojista_nome" id="lojista_nome" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" required />
                    </div>

                    <div>
                      <label htmlFor="produto_id" className="block text-sm font-medium text-gray-700">Produto</label>
                      <select
                        name="produto_id"
                        id="produto_id"
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                        required
                      >
                        <option value="">Selecione um produto</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.nome} ({product.fornecedores?.nome})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade</label>
                      <input
                        type="number"
                        name="quantidade"
                        id="quantidade"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                        min="1"
                        required
                      />
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-lg font-medium text-gray-900">
                        Valor Total: <span className="text-indigo-600">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}</span>
                      </h4>
                    </div>

                    {error && <div className="rounded-md bg-red-50 p-4"><p className="text-sm text-red-700">{error}</p></div>}

                    <div className="mt-6 flex justify-end space-x-2">
                      <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200" onClick={closeModal}>
                        Cancelar
                      </button>
                      <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                        Salvar Pedido
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