export interface Fornecedor {
    id: string;
    nome: string;
    cnpj?: string;
    contato_whatsapp?: string;
    email?: string;
    endereco?: string;
    status: 'ativo' | 'inativo';
    criado_em: string;
}

export interface Produto {
    id: string;
    fornecedor_id: string;
    nome: string;
    preco: number;
    foto_url?: string;
    estoque: number;
    criado_em: string;
    fornecedor?: Fornecedor;
}

export interface Pedido {
    id: string;
    lojista_nome: string;
    produto_id: string;
    quantidade: number;
    status: 'aguardando' | 'pago' | 'enviado' | 'cancelado';
    criado_em: string;
    produto?: Produto;
} 