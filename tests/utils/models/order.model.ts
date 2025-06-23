export interface CreateOrderRequest {
  user_id: number;
  product: string;
  amount: number;
}

export interface OrderResponse {
  id: number;
  user_id: number;
  product: string;
  amount: string;
  created_at: string;
}

export type OrdersResponse = OrderResponse[];
