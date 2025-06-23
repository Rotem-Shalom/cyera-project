import { Request, Response } from 'express';
import * as gatewayService from './gateway.service';

export async function createUser(req: Request, res: Response) {
  try {
    const user = await gatewayService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(error.status || 500).json(error.data || { message: 'Internal error' });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await gatewayService.getUserById(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(error.status || 500).json(error.data || { message: 'Internal error' });
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    const order = await gatewayService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(error.status || 500).json(error.data || { message: 'Internal error' });
  }
}

export async function getOrdersByUserId(req: Request, res: Response) {
  try {
    const orders = await gatewayService.getOrdersByUserId(req.params.user_id);
    res.json(orders);
  } catch (error: any) {
    res.status(error.status || 500).json(error.data || { message: 'Internal error' });
  }
}
