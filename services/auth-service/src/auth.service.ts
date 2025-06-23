// authService.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const VALID_USER = {
  username: 'admin',
  password: 'password',
  user_id: 1,
};

export interface LoginProps {
  username: string;
  password: string;
}

export function authenticate(loginProps: LoginProps): string {
  if (loginProps.username === VALID_USER.username && loginProps.password === VALID_USER.password) {
    return jwt.sign({ user_id: VALID_USER.user_id, username: loginProps.username }, JWT_SECRET, {
      expiresIn: '1h',
    });
  }
  throw new Error('Invalid credentials');
}
