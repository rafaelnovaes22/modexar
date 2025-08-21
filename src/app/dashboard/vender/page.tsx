import SalesForm from '@/components/SalesForm';

export default function VenderPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Frente de Caixa</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Registrar Nova Venda</h2>
        <SalesForm />
      </div>
    </div>
  );
}
