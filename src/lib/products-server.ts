'use server';

import { supabase } from './database';
import { Database } from '@/types/supabase';
import { revalidatePath } from 'next/cache';

// Tipos Helper
export type Produto = Database['public']['Tables']['produtos']['Row'];
export type NewProduto = Database['public']['Tables']['produtos']['Insert'];

// Tipo para o produto com o nome do fornecedor (resultado do JOIN)
export type ProdutoComFornecedor = Produto & {
  fornecedores: {
    nome: string;
  } | null;
};

/**
 * Busca todos os produtos no banco de dados, incluindo o nome do fornecedor associado.
 * @returns Uma promessa que resolve para um array de produtos com dados do fornecedor.
 */
export async function getProducts(): Promise<ProdutoComFornecedor[]> {
  // O método .select() do Supabase permite fazer o JOIN de forma declarativa
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      *,
      fornecedores (
        nome
      )
    `)
    .order('criado_em', { ascending: false });

  if (error) {
    console.error('Erro ao buscar produtos:', error.message);
    throw new Error('Não foi possível buscar os dados dos produtos.');
  }

  return data || [];
}

/**
 * Adiciona um novo produto ao banco de dados.
 * @param productData - Os dados do novo produto.
 */
export async function addProduct(productData: NewProduto) {
  const { error } = await supabase
    .from('produtos')
    .insert(productData);

  if (error) {
    console.error('Erro ao adicionar produto:', error.message);
    throw new Error('Não foi possível adicionar o novo produto.');
  }

  // Invalida o cache da página de produtos para que a lista seja atualizada
  revalidatePath('/dashboard/produtos');
}
