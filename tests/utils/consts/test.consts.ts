export const DEFAULT_MQ_EVENT_LOGS_URL= '../../logs/mq-events/consumer-events.log'
export const DEFAULT_GATEWAY_URL= 'http://localhost:3000'
export const DEFAULT_AUTH_URL= 'http://localhost:3003'

export const ROUTES = {
  AUTH_LOGIN: '/auth/login',
  USERS: '/users',
  ORDERS: '/orders',
  USER_ORDERS: (userId: number) => `/orders/user/${userId}`,
  USER_BY_ID: (userId: number) => `/users/${userId}`,
};

export const URLS = {
  GATEWAY: process.env.GATEWAY_URL || DEFAULT_GATEWAY_URL,
  AUTH: process.env.AUTH_URL || DEFAULT_AUTH_URL,
};

