import { Router } from 'express';
import { createOrder, getOrdersByUserId } from './ordersController';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders/user/:user_id', getOrdersByUserId);

export default router;
