import { query } from './index';

export async function createUsersTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await query(sql);
    console.log('users table was created');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
}
