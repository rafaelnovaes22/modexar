'use server';

import { supabase } from './database';
import { Database } from '@/types/supabase';
import { revalidatePath } from 'next/cache';

// Tipos Helper
export type Pedido = Database['public']['Tables']['pedidos']['Row'];
export type NewPedido = Database['public']['Tables']['pedidos']['Insert'];

// Tipo estendido para incluir dados do produto e fornecedor
export type PedidoCompleto = Pedido & {
  produtos: {
    nome: string;
    fornecedores: {
      nome: string;
    } | null;
  } | null;
};

/**
 * Busca todos os pedidos, incluindo o nome do produto e do fornecedor.
 * @returns Uma promessa que resolve para um array de pedidos completos.
 */
export async function getOrders(): Promise<PedidoCompleto[]> {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      produtos (
        nome,
        fornecedores (
          nome
        )
      )
    `)
    .order('criado_em', { ascending: false });

  if (error) {
    console.error('Erro ao buscar pedidos:', error.message);
    throw new Error('Não foi possível buscar os dados dos pedidos.');
  }

  return data || [];
}

/**
 * Adiciona um novo pedido ao banco de dados.
 * @param orderData - Os dados do novo pedido.
 */
export async function addOrder(orderData: NewPedido) {
  // Idealmente, aqui também teríamos uma lógica para verificar o estoque do produto
  // e talvez diminuí-lo, mas para o MVP, vamos focar na criação do pedido.

  const { error } = await supabase
    .from('pedidos')
    .insert(orderData);

  if (error) {
    console.error('Erro ao adicionar pedido:', error.message);
    throw new Error('Não foi possível registrar o novo pedido.');
  }

  // Invalida o cache da página de pedidos para que a lista seja atualizada
  revalidatePath('/dashboard/pedidos');
}
