import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { hash, compare } from 'bcryptjs';
import { SignJWT } from 'jose';
import { query } from './database';

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const BCRYPT_SALT_ROUNDS = 10;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not set in environment variables');
}

const key = new TextEncoder().encode(SECRET_KEY);

// Função para criar um JWT
async function createJwt(payload: { userId: string; email: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // Token expira em 1 hora
    .sign(key);
}

// Server Action para registro de usuário
export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return redirect('/cadastro?message=Email e senha são obrigatórios.');
  }

  try {
    // Verifica se o usuário já existe
    const existingUser = await query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return redirect('/cadastro?message=Este email já está em uso.');
    }

    // Faz o hash da senha
    const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);

    // Insere o novo usuário no banco de dados
    const result = await query(
      'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    );

    if (result.rows.length === 0) {
      throw new Error('Falha ao registrar o usuário.');
    }

  } catch (error) {
    console.error('SignUp Error:', error);
    return redirect('/cadastro?message=Ocorreu um erro no servidor. Tente novamente.');
  }

  return redirect('/login?message=Cadastro realizado com sucesso! Faça o login.');
}

// Server Action para login de usuário
export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return redirect('/login?message=Email e senha são obrigatórios.');
  }

  try {
    // Busca o usuário no banco de dados
    const result = await query('SELECT id, email, password FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return redirect('/login?message=Email ou senha inválidos.');
    }

    // Compara a senha fornecida com o hash salvo
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return redirect('/login?message=Email ou senha inválidos.');
    }

    // Cria o token JWT
    const token = await createJwt({ userId: user.id, email: user.email });

    // Define o cookie de autenticação
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hora
    });

  } catch (error) {
    console.error('SignIn Error:', error);
    return redirect('/login?message=Ocorreu um erro no servidor. Tente novamente.');
  }

  // Redireciona para o dashboard em caso de sucesso
  return redirect('/dashboard');
}

// Server Action para logout
export async function signOut() {
  cookies().delete('auth_token');
  redirect('/login');
}