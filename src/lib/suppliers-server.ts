'use server';

import { supabase } from './database';
import { Database } from '@/types/supabase';
import { revalidatePath } from 'next/cache';

// Definindo um tipo helper para facilitar
export type Fornecedor = Database['public']['Tables']['fornecedores']['Row'];
type NewFornecedor = Database['public']['Tables']['fornecedores']['Insert'];

/**
 * Busca todos os fornecedores no banco de dados.
 * @returns Uma promessa que resolve para um array de fornecedores.
 */
export async function getSuppliers(): Promise<Fornecedor[]> {
  const { data, error } = await supabase
    .from('fornecedores')
    .select('*')
    .order('criado_em', { ascending: false });

  if (error) {
    console.error('Erro ao buscar fornecedores:', error.message);
    throw new Error('Não foi possível buscar os dados dos fornecedores.');
  }

  return data || [];
}

/**
 * Adiciona um novo fornecedor ao banco de dados.
 * @param supplierData - Os dados do novo fornecedor.
 * @returns Uma promessa que resolve para o fornecedor recém-criado.
 */
export async function addSupplier(supplierData: NewFornecedor): Promise<Fornecedor> {
  const { data, error } = await supabase
    .from('fornecedores')
    .insert(supplierData)
    .select()
    .single(); // .single() retorna o objeto inserido em vez de um array

  if (error) {
    console.error('Erro ao adicionar fornecedor:', error.message);
    // Poderíamos tratar erros específicos aqui, como CNPJ duplicado
    throw new Error('Não foi possível adicionar o novo fornecedor.');
  }

  // Invalida o cache da página de fornecedores para que a lista seja atualizada
  revalidatePath('/dashboard/fornecedores');

  return data;
}

/**
 * Atualiza os dados de um fornecedor existente.
 * @param id - O UUID do fornecedor a ser atualizado.
 * @param updatedData - Os campos a serem atualizados.
 * @returns Uma promessa que resolve para o fornecedor atualizado.
 */
export async function updateSupplier(id: string, updatedData: Partial<NewFornecedor>): Promise<Fornecedor> {
    const { data, error } = await supabase
        .from('fornecedores')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Erro ao atualizar fornecedor:', error.message);
        throw new Error('Não foi possível atualizar o fornecedor.');
    }

    revalidatePath('/dashboard/fornecedores');
    revalidatePath(`/dashboard/fornecedores/${id}`); // Invalida a página de detalhes também, se houver

    return data;
}

/**
 * Deleta um fornecedor do banco de dados.
 * @param id - O UUID do fornecedor a ser deletado.
 */
export async function deleteSupplier(id: string): Promise<void> {
    const { error } = await supabase
        .from('fornecedores')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao deletar fornecedor:', error.message);
        throw new Error('Não foi possível deletar o fornecedor.');
    }

    revalidatePath('/dashboard/fornecedores');
}
