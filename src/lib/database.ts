import { createClient } from '@supabase/supabase-js';

// Como próximo passo, devemos gerar os tipos TypeScript a partir do schema do Supabase
// para obter segurança de tipos completa e autocomplete. Por enquanto, usaremos o cliente sem tipos customizados.
// Veja a documentação do Supabase para gerar os tipos: https://supabase.com/docs/guides/database/api/generating-types

// Variáveis de ambiente para configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validação para garantir que as variáveis de ambiente foram configuradas
if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Criação do cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
