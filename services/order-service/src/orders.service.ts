import * as orderRepository from './orders.repository';
import { Order } from './models/order.model';

export async function createOrder(order: Order): Promise<Order> {
  return orderRepository.createOrder(order);
}

export async function getOrdersByUserId(user_id: string): Promise<Order[]> {
  return orderRepository.getOrdersByUserId(user_id);
}
