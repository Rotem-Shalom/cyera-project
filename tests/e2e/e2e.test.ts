import request from 'supertest';
import { AuthLoginRequest, AuthLoginResponse } from '../utils/models/auth.model';
import { CreateUserRequest, UserResponse } from '../utils/models/user.model';
import { CreateOrderRequest, OrderResponse, OrdersResponse } from '../utils/models/order.model';
import { URLS, ROUTES, DEFAULT_MQ_EVENT_LOGS_URL} from '../utils/consts/test.consts';
import fs from 'fs';
import path from 'path';

describe('End-to-End System Test', () => {
  let token: string;
  let userId: number;

  it('should authenticate and get JWT token', async () => {
    const req_body: AuthLoginRequest = { username: 'admin', password: 'password' };

    const res = await request(URLS.AUTH)
      .post(ROUTES.AUTH_LOGIN)
      .send(req_body);

    expect(res.status).toBe(200);
    const res_body: AuthLoginResponse = res.body;
    expect(res_body.token).toBeDefined();

    token = res_body.token;
  });

  it('should create a new user', async () => {
    const req_body: CreateUserRequest = { name: 'test', email: 'test@example.com' };

    const res = await request(URLS.GATEWAY)
      .post(ROUTES.USERS)
      .set('Authorization', `Bearer ${token}`)
      .send(req_body);

    expect(res.status).toBe(201);
    const res_body: UserResponse = res.body;
    expect(res_body.id).toBeDefined();

    userId = res_body.id;
  });

  it('should create an order for the user', async () => {
    const req_body: CreateOrderRequest = { user_id: userId, product: 'Book', amount: 50 };

    const res = await request(URLS.GATEWAY)
      .post(ROUTES.ORDERS)
      .set('Authorization', `Bearer ${token}`)
      .send(req_body);

    expect(res.status).toBe(201);
    const res_body: OrderResponse = res.body;
    expect(res_body.id).toBeDefined();
  });

  it('should get user by id', async () => {
    const res = await request(URLS.GATEWAY)
      .get(ROUTES.USER_BY_ID(userId))
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    const res_body: UserResponse = res.body;
    expect(res_body.email).toBe('test@example.com');
    expect(res_body.name).toBe('test');
  });

  it('should get all orders for the user', async () => {
    const res = await request(URLS.GATEWAY)
      .get(ROUTES.USER_ORDERS(userId))
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    const res_body: OrdersResponse = res.body;

    expect(Array.isArray(res_body)).toBe(true);
    expect(res_body.length).toBeGreaterThan(0);

    res_body.forEach(order => {
      expect(order.user_id).toEqual(userId);
    });
  });

  describe('Event Log Test', () => {
    it('should include user.created, order.created event in log file', async () => {
      const rawPath = process.env.MQ_EVENT_LOGS_URL || DEFAULT_MQ_EVENT_LOGS_URL;
      const logFilePath = path.isAbsolute(rawPath) ? rawPath : path.resolve(__dirname, rawPath);
      const logs = await fs.promises.readFile(logFilePath, 'utf-8');
      expect(logs).toMatch(/Received user.created event/);
      expect(logs).toMatch(/Received order.created event/);
      expect(logs).toMatch(/test@example.com/); 
      expect(logs).toMatch(/Book/); 
    });
  });
});
