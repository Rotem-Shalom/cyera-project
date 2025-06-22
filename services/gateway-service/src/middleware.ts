import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const AUTH_SERVICE_URL = process.env.AUTH_URL || 'http://auth-service:3003';

export async function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    await axios.post(`${AUTH_SERVICE_URL}/auth/verify`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}
