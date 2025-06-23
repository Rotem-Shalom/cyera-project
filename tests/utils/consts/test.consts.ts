export const ROUTES = {
  AUTH_LOGIN: '/auth/login',
  USERS: '/users',
  ORDERS: '/orders',
  USER_ORDERS: (userId: number) => `/orders/user/${userId}`,
  USER_BY_ID: (userId: number) => `/users/${userId}`,
};

export const URLS = {
  GATEWAY: process.env.GATEWAY_URL || 'http://gateway-service:3000',
  AUTH: process.env.AUTH_URL || 'http://auth-service:3003',
};
