import { query } from './database';
import { mockSuppliers } from './mock-data';
import { Fornecedor } from '@/types';

const isDevelopment = process.env.NODE_ENV === 'development';

export const createSupplier = async (supplierData: Partial<Fornecedor>) => {
  if (isDevelopment) {
    const newSupplier = {
      ...supplierData,
      id: Math.random().toString(),
      status: 'ativo' as const,
      criado_em: new Date().toISOString()
    };
    return { data: [newSupplier] };
  }
  
  try {
    const result = await query(
      'INSERT INTO fornecedores (nome, cnpj, contato_whatsapp, email, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [supplierData.nome, supplierData.cnpj, supplierData.contato_whatsapp, supplierData.email, supplierData.endereco]
    );
    return { data: result.rows };
  } catch (error) {
    console.error('Error creating supplier:', error);
    return { error };
  }
};

export const readSuppliers = async () => {
  if (isDevelopment) {
    return { data: mockSuppliers };
  }
  
  try {
    const result = await query('SELECT * FROM fornecedores ORDER BY criado_em DESC');
    return { data: result.rows };
  } catch (error) {
    console.error('Error reading suppliers:', error);
    return { error };
  }
};

export const updateSupplier = async (id: string, updatedData: Partial<Fornecedor>) => {
  if (isDevelopment) {
    return { data: [{ ...updatedData, id }] };
  }
  
  try {
    const fields = Object.keys(updatedData).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = Object.values(updatedData);
    const result = await query(
      `UPDATE fornecedores SET ${fields} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return { data: result.rows };
  } catch (error) {
    console.error('Error updating supplier:', error);
    return { error };
  }
};

export const deleteSupplier = async (id: string) => {
  if (isDevelopment) {
    return { success: true };
  }
  
  try {
    await query('DELETE FROM fornecedores WHERE id = $1', [id]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting supplier:', error);
    return { error };
  }
};