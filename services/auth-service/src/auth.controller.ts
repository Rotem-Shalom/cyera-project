import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as authService from './auth.service';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function login(req: Request, res: Response) {
  try {
    const token = authService.authenticate(req.body);
    res.json({ token });
  } catch {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

export function verifyToken(req: Request, res: Response) {
  res.json({ message: 'Token is valid', user: (req as any).user });
}

export function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    (req as any).user = decoded;
    next();
  });  
}
