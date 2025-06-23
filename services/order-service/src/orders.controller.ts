import { Request, Response } from 'express';
import * as orderService from './orders.service';
import { publishToQueue } from './mq/mqProducer';

export async function createOrder(req: Request, res: Response) {
  try {
    const order = await orderService.createOrder(req.body);
    publishToQueue('order.created', order);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getOrdersByUserId(req: Request, res: Response) {
  try {
    const orders = await orderService.getOrdersByUserId(req.params.user_id);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
