import { Router } from 'express';
import { login, verifyTokenMiddleware, verifyToken } from './auth.controller';

const router = Router();

router.post('/auth/login', login);
router.get('/auth/verify', verifyTokenMiddleware, verifyToken);


export default router;
