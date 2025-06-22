import { query } from './db';

export interface Order {
  id?: number;
  user_id: number;
  product: string;
  amount: number;
  created_at?: Date;
}

export async function createOrder(order: Order): Promise<Order> {
  const { user_id, product, amount } = order;
  const sql = 'INSERT INTO orders (user_id, product, amount) VALUES ($1, $2, $3) RETURNING *';
  const result = await query(sql, [user_id, product, amount]);
  return result.rows[0];
}

export async function getOrdersByUserId(user_id: string): Promise<Order[]> {
  const sql = 'SELECT * FROM orders WHERE user_id = $1';
  const result = await query(sql, [user_id]);
  return result.rows;
}
