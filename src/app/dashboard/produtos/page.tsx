import ProductList from '@/components/ProductList';
import ProductForm from '@/components/ProductForm';

export default function ProdutosPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestão de Produtos</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Cadastrar Novo Produto</h2>
        <ProductForm />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Produtos Cadastrados</h2>
        <ProductList />
      </div>
    </div>
  );
}
