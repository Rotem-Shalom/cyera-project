import { query } from './db'; 
import amqp from 'amqplib'; 

export async function checkDbConnection(): Promise<boolean> {
  try {
      await query('SELECT 1');
      console.log('DB healthcheck succeeded');
    return true;
  } catch (err) {
    console.error('DB healthcheck failed:', err);
    return false;
  }
}


export async function checkRabbitMQ(): Promise<boolean> {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
    await conn.close();
    console.log('MQ healthcheck succeeded');  
    return true;
  } catch (err) {
    console.error('MQ healthcheck failed:', err);
    return false;
  }
}