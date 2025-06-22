import { query } from './index';

export async function createOrdersTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      product VARCHAR(100) NOT NULL,
      amount NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await query(sql);
    console.log('orders table is ready');
  } catch (error) {
    console.error('Error creating orders table:', error);
    throw error;
  }
}