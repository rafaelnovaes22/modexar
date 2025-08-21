import SupplierList from '@/components/SupplierList';
import SupplierForm from '@/components/SupplierForm';

export default function FornecedoresPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestão de Fornecedores</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Cadastrar Novo Fornecedor</h2>
        <SupplierForm />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Fornecedores Cadastrados</h2>
        <SupplierList />
      </div>
    </div>
  );
}
