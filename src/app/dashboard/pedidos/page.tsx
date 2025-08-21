import OrderList from '@/components/OrderList';
import OrderForm from '@/components/OrderForm';

export default function PedidosPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestão de Pedidos de Compra</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Criar Novo Pedido</h2>
        <OrderForm />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Pedidos Cadastrados</h2>
        <OrderList />
      </div>
    </div>
  );
}
