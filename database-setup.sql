-- Criar extensão UUID se não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários/autenticação
CREATE TABLE usuarios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Armazena o hash da senha
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de fornecedores
CREATE TABLE fornecedores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome TEXT NOT NULL,
    cnpj TEXT UNIQUE,
    contato_whatsapp TEXT,
    email TEXT,
    endereco TEXT,
    status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE produtos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    fornecedor_id UUID REFERENCES fornecedores(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL,
    foto_url TEXT,
    estoque INTEGER DEFAULT 0,
    categoria TEXT,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pedidos
CREATE TABLE pedidos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lojista_nome TEXT NOT NULL,
    lojista_email TEXT,
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    quantidade INTEGER NOT NULL,
    valor_unitario NUMERIC(10,2) NOT NULL,
    valor_total NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'aguardando' CHECK (status IN ('aguardando', 'confirmado', 'pago', 'enviado', 'entregue', 'cancelado')),
    observacoes TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_fornecedores_status ON fornecedores(status);
CREATE INDEX idx_produtos_fornecedor ON produtos(fornecedor_id);
CREATE INDEX idx_produtos_categoria ON produtos(categoria);
CREATE INDEX idx_produtos_ativo ON produtos(ativo);
CREATE INDEX idx_pedidos_produto ON pedidos(produto_id);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_pedidos_data ON pedidos(criado_em);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para pedidos
CREATE TRIGGER trigger_update_pedidos_timestamp
    BEFORE UPDATE ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Views úteis
CREATE VIEW v_produtos_completos AS
SELECT 
    p.*,
    f.nome as fornecedor_nome,
    f.contato_whatsapp as fornecedor_whatsapp,
    f.email as fornecedor_email
FROM produtos p
JOIN fornecedores f ON p.fornecedor_id = f.id
WHERE p.ativo = true AND f.status = 'ativo';

CREATE VIEW v_pedidos_completos AS
SELECT 
    pe.*,
    pr.nome as produto_nome,
    pr.foto_url as produto_foto,
    f.nome as fornecedor_nome,
    f.contato_whatsapp as fornecedor_whatsapp
FROM pedidos pe
JOIN produtos pr ON pe.produto_id = pr.id
JOIN fornecedores f ON pr.fornecedor_id = f.id;