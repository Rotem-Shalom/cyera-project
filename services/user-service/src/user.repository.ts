import { query } from './db';
import { User } from './models/user.model';

export async function createUser(user: User): Promise<User> {
  const sql = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
  const result = await query(sql, [user.name, user.email]);
  return result.rows[0];
}

export async function getUserById(id: string): Promise<User | null> {
  const sql = 'SELECT * FROM users WHERE id = $1';
  const result = await query(sql, [id]);
  return result.rows[0] || null;
}
