export interface Order {
  id?: number;
  user_id: number;
  product: string;
  amount: number;
  created_at?: Date;
}