import { query } from './database';
import { z } from 'zod';
import type { Fornecedor } from './suppliers-server';

// Validação com Zod
const ProdutoSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(1, 'O nome é obrigatório.'),
  descricao: z.string().nullable().optional(),
  preco: z.number().positive('O preço deve ser um número positivo.'),
  estoque: z.number().int().min(0, 'O estoque não pode ser negativo.'),
  fornecedor_id: z.string().uuid('ID de fornecedor inválido.'),
});

export type Produto = z.infer<typeof ProdutoSchema>;
export type ProdutoComFornecedor = Produto & { fornecedores: Fornecedor | null };

// Função para ler todos os produtos, incluindo dados do fornecedor
export async function readProductsWithSuppliers() {
  try {
    const sql = `
      SELECT 
        p.*,
        json_build_object(
          'id', f.id,
          'nome', f.nome
        ) as fornecedor
      FROM produtos p
      LEFT JOIN fornecedores f ON p.fornecedor_id = f.id
      ORDER BY p.nome ASC;
    `;
    const result = await query(sql);
    
    // Renomeia 'fornecedor' para 'fornecedores' para manter compatibilidade com o frontend
    const products = result.rows.map(row => ({
      ...row,
      fornecedores: row.fornecedor,
      fornecedor: undefined,
    }));

    return { data: products, error: null };
  } catch (error) {
    console.error('Failed to fetch products with suppliers:', error);
    return { data: null, error };
  }
}

// Função para adicionar um novo produto
export async function addProduct(productData: Omit<Produto, 'id'>) {
  try {
    const validatedData = ProdutoSchema.omit({ id: true }).parse(productData);
    const { nome, descricao, preco, estoque, fornecedor_id } = validatedData;

    const result = await query(
      'INSERT INTO produtos (nome, descricao, preco, estoque, fornecedor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, descricao, preco, estoque, fornecedor_id]
    );
    
    return { data: result.rows, error: null };
  } catch (error) {
    console.error('Failed to add product:', error);
    return { data: null, error };
  }
}