import { Pool } from 'pg';

// Define um tipo para os valores que podem ser passados em uma consulta parametrizada.
type QueryValues = (string | number | boolean | null)[];

// Cria um novo pool de conexões. O pool irá ler as variáveis de ambiente
// (PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT) ou a variável POSTGRES_URL.
const pool = new Pool({
  // Configuração recomendada para ambientes serverless como Vercel
  max: 1, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Função para executar consultas SQL.
export async function query(text: string, params?: QueryValues) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
}

// Exporta o pool caso seja necessário para transações ou outras operações específicas.
export default pool;