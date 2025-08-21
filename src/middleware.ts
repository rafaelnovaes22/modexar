import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Forçando a reavaliação do cache do Next.js
const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not set in environment variables');
}

const key = new TextEncoder().encode(SECRET_KEY);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas que não exigem autenticação
  const publicPaths = ['/login', '/cadastro'];

  // Se a rota for pública, não faz nada
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Tenta obter o token do cookie
  const tokenCookie = request.cookies.get('auth_token');

  if (!tokenCookie) {
    // Se não houver token, redireciona para o login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('message', 'Por favor, faça login para continuar.');
    return NextResponse.redirect(url);
  }

  try {
    // Verifica se o token JWT é válido
    await jwtVerify(tokenCookie.value, key);
    
    // Se o token for válido, permite o acesso à rota solicitada
    return NextResponse.next();

  } catch (error) {
    // Se o token for inválido ou expirado, redireciona para o login
    console.error('JWT Verification Error:', error);
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('message', 'Sua sessão expirou. Faça login novamente.');
    
    // Deleta o cookie inválido
    const response = NextResponse.redirect(url);
    response.cookies.delete('auth_token');
    return response;
  }
}

// Configuração do matcher para definir quais rotas o middleware deve proteger
export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas, exceto as que começam com:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico (ícone)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};