import { Fornecedor, Produto, Pedido } from '@/types';

export const mockSuppliers: Fornecedor[] = [
  {
    id: '1',
    nome: 'Fornecedor A',
    cnpj: '11.111.111/0001-11',
    contato_whatsapp: '11999999999',
    email: 'fornecedora@example.com',
    endereco: 'Rua das Flores, 123',
    status: 'ativo',
    criado_em: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2', 
    nome: 'Fornecedor B',
    cnpj: '22.222.222/0001-22',
    contato_whatsapp: '11888888888',
    email: 'fornecedorb@example.com',
    endereco: 'Av. Principal, 456',
    status: 'ativo',
    criado_em: '2024-01-02T00:00:00.000Z'
  }
];

export const mockProducts: Produto[] = [
  {
    id: '1',
    fornecedor_id: '1',
    nome: 'Produto A',
    preco: 29.99,
    foto_url: 'https://example.com/produto-a.jpg',
    estoque: 100,
    criado_em: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    fornecedor_id: '2',
    nome: 'Produto B',
    preco: 49.99,
    foto_url: 'https://example.com/produto-b.jpg', 
    estoque: 50,
    criado_em: '2024-01-02T00:00:00.000Z'
  }
];

export const mockOrders: Pedido[] = [
  {
    id: '1',
    lojista_nome: 'Lojista A',
    produto_id: '1',
    quantidade: 5,
    status: 'aguardando',
    criado_em: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    lojista_nome: 'Lojista B', 
    produto_id: '2',
    quantidade: 3,
    status: 'pago',
    criado_em: '2024-01-02T00:00:00.000Z'
  }
];