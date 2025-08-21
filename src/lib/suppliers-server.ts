import { query } from './database';
import { z } from 'zod';

// Validação com Zod para garantir a integridade dos dados
const FornecedorSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(1, 'O nome é obrigatório.'),
  cnpj: z.string().nullable().optional(),
  contato_whatsapp: z.string().nullable().optional(),
  email: z.string().email('Email inválido.').nullable().optional(),
  endereco: z.string().nullable().optional(),
});

export type Fornecedor = z.infer<typeof FornecedorSchema>;

// Função para ler todos os fornecedores
export async function readSuppliers() {
  try {
    const result = await query('SELECT * FROM fornecedores ORDER BY nome ASC');
    return { data: result.rows, error: null };
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
    return { data: null, error };
  }
}

// Função para criar um novo fornecedor
export async function createSupplier(supplierData: Omit<Fornecedor, 'id'>) {
  try {
    // Valida os dados antes de inserir
    const validatedData = FornecedorSchema.omit({ id: true }).parse(supplierData);

    const { nome, cnpj, contato_whatsapp, email, endereco } = validatedData;

    const result = await query(
      'INSERT INTO fornecedores (nome, cnpj, contato_whatsapp, email, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, cnpj, contato_whatsapp, email, endereco]
    );
    
    return { data: result.rows, error: null };
  } catch (error) {
    console.error('Failed to create supplier:', error);
    return { data: null, error };
  }
}