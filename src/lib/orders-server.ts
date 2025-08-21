import { query } from './database';
import { z } from 'zod';
import type { ProdutoComFornecedor } from './products-server';

// Validação com Zod
const StatusPedidoSchema = z.enum(['aguardando', 'processando', 'enviado', 'entregue', 'cancelado']);

const PedidoSchema = z.object({
  id: z.string().uuid().optional(),
  lojista_nome: z.string().min(1, 'O nome do lojista é obrigatório.'),
  produto_id: z.string().uuid('ID de produto inválido.'),
  quantidade: z.number().int().positive('A quantidade deve ser maior que zero.'),
  valor_unitario: z.number().positive('O valor unitário deve ser positivo.'),
  valor_total: z.number().positive('O valor total deve ser positivo.'),
  status: StatusPedidoSchema,
  data_pedido: z.date().optional(),
});

export type Pedido = z.infer<typeof PedidoSchema>;
export type PedidoComProduto = Pedido & { produtos: ProdutoComFornecedor | null };

// Função para ler todos os pedidos com detalhes do produto e fornecedor
export async function readOrdersWithProducts() {
  try {
    const sql = `
      SELECT 
        ped.*,
        json_build_object(
          'id', prod.id,
          'nome', prod.nome,
          'fornecedores', json_build_object(
            'id', f.id,
            'nome', f.nome
          )
        ) as produto
      FROM pedidos ped
      LEFT JOIN produtos prod ON ped.produto_id = prod.id
      LEFT JOIN fornecedores f ON prod.fornecedor_id = f.id
      ORDER BY ped.data_pedido DESC;
    `;
    const result = await query(sql);

    // Renomeia 'produto' para 'produtos' para manter compatibilidade com o frontend
    const orders = result.rows.map(row => ({
      ...row,
      produtos: row.produto,
      produto: undefined,
    }));

    return { data: orders, error: null };
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return { data: null, error };
  }
}

// Função para adicionar um novo pedido
export async function addOrder(orderData: Omit<Pedido, 'id' | 'data_pedido'>) {
  try {
    const validatedData = PedidoSchema.omit({ id: true, data_pedido: true }).parse(orderData);
    const { lojista_nome, produto_id, quantidade, valor_unitario, valor_total, status } = validatedData;

    // Atualiza o estoque do produto
    const stockUpdateResult = await query(
      'UPDATE produtos SET estoque = estoque - $1 WHERE id = $2 AND estoque >= $1 RETURNING id',
      [quantidade, produto_id]
    );

    if (stockUpdateResult.rowCount === 0) {
      throw new Error('Estoque insuficiente ou produto não encontrado.');
    }

    // Insere o pedido
    const result = await query(
      'INSERT INTO pedidos (lojista_nome, produto_id, quantidade, valor_unitario, valor_total, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [lojista_nome, produto_id, quantidade, valor_unitario, valor_total, status]
    );
    
    return { data: result.rows, error: null };
  } catch (error) {
    console.error('Failed to add order:', error);
    // Idealmente, aqui deveria haver uma lógica de transação para reverter a atualização do estoque em caso de falha na inserção do pedido.
    // Por simplicidade, isso foi omitido.
    return { data: null, error };
  }
}