# Setup do Marketplace Brás

## 🚀 Configuração Inicial

### 1. Configurar Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Vá em **Settings** → **API** e copie:
   - `Project URL` 
   - `anon public` key

### 2. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica-do-supabase

# Mercado Pago (será configurado posteriormente)
MERCADO_PAGO_ACCESS_TOKEN=seu-token-do-mercado-pago
MERCADO_PAGO_PUBLIC_KEY=sua-chave-publica-do-mercado-pago
```

### 3. Criar Tabelas no Supabase

1. Vá no **SQL Editor** do seu projeto Supabase
2. Execute o conteúdo do arquivo `database-setup.sql`

### 4. Executar o Projeto

```bash
npm run dev
```

## 📁 Estrutura do Projeto

```
marketplace-bras/
├── src/
│   ├── app/           # Páginas (App Router)
│   ├── components/    # Componentes reutilizáveis
│   ├── lib/          # Cliente Supabase e utilitários
│   └── types/        # Tipos TypeScript
├── database-setup.sql # Script SQL das tabelas
└── SETUP.md          # Este arquivo
```

## 🎯 Próximos Passos

1. ✅ Estrutura do projeto criada
2. ⏳ Painel de fornecedores
3. ⏳ Cadastro de produtos
4. ⏳ Catálogo público
5. ⏳ Sistema de pedidos
6. ⏳ Integração Mercado Pago 