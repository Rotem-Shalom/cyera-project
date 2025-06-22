import { Router } from 'express';
import * as gatewayController from './controller';

const router = Router();

router.post('/users', gatewayController.createUser);
router.get('/users/:id', gatewayController.getUserById);

router.post('/orders', gatewayController.createOrder);
router.get('/orders/user/:user_id', gatewayController.getOrdersByUserId);

export default router;
