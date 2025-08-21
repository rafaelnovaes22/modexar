import { Pool } from 'pg';

const isDevelopment = process.env.NODE_ENV === 'development';

const pool = isDevelopment ? null : new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const query = async (text: string, params?: any[]) => {
  if (isDevelopment) {
    console.log('Mock query:', text, params);
    return { rows: [] };
  }
  
  if (!pool) {
    throw new Error('Database pool not initialized');
  }
  
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

export const getClient = async () => {
  if (isDevelopment || !pool) {
    throw new Error('Database not available in development mode');
  }
  return await pool.connect();
};

export default pool;