import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

export async function connectToDb() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to DB');
      return;
    } catch {
      console.log(`DB connection failed, retrying... (${i + 1}/${MAX_RETRIES})`);
      await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
    }
  }
  console.error('Could not connect to DB, exiting');
  process.exit(1);
}

