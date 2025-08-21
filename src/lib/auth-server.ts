'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from '@/types/supabase';

/**
 * Cria um cliente Supabase para uso em Server Components/Actions.
 * Ele é configurado para ler e escrever cookies, gerenciando a sessão do usuário.
 */
function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

/**
 * Realiza o cadastro de um novo usuário.
 * @param formData - Os dados do formulário contendo email e senha.
 */
export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Erro no cadastro:', error.message);
    // Redireciona de volta para a página de cadastro com uma mensagem de erro
    return redirect('/cadastro?message=Não foi possível realizar o cadastro.');
  }

  // Redireciona para a página de login com uma mensagem de sucesso
  return redirect('/login?message=Cadastro realizado com sucesso! Faça o login.');
}

/**
 * Realiza o login do usuário.
 * @param formData - Os dados do formulário contendo email e senha.
 */
export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro no login:', error.message);
    return redirect('/login?message=Email ou senha inválidos.');
  }

  // Redireciona para o dashboard em caso de sucesso
  return redirect('/dashboard');
}

/**
 * Realiza o logout do usuário.
 */
export async function signOut() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  
  // Redireciona para a página de login após o logout
  return redirect('/login');
}
