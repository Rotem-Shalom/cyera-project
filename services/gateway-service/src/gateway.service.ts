import axios from 'axios';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://order-service:3002';

export async function createUser(userData: object) {
  const response = await axios.post(`${USER_SERVICE_URL}/users`, userData);
  return response.data;
}

export async function getUserById(userId: string) {
  const response = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
  return response.data;
}

export async function createOrder(orderData: object) {
  const response = await axios.post(`${ORDER_SERVICE_URL}/orders`, orderData);
  return response.data;
}

export async function getOrdersByUserId(userId: string) {
  const response = await axios.get(`${ORDER_SERVICE_URL}/orders/user/${userId}`);
  return response.data;
}
