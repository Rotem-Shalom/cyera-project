import amqp, { Channel } from 'amqplib';

let channel: Channel;

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 5000;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function connectRabbitMQ(): Promise<void> {
  const url = process.env.RABBITMQ_URL || 'amqp://rabbitmq';

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Connecting to RabbitMQ...`);
      const connection = await amqp.connect(url);
      channel = await connection.createChannel();
      console.log('Connected to RabbitMQ successfully');
      return;
    } catch (err) {

      if (attempt === MAX_RETRIES) {
        console.error('Could not connect to RabbitMQ after multiple attempts');
        process.exit(1);
      }

      await sleep(RETRY_DELAY_MS);
    }
  }
}

export function publishToQueue(queue: string, message: object): void {
  if (!channel) {
    throw new Error('RabbitMQ channel is not initialized');
  }

  const buffer = Buffer.from(JSON.stringify(message));
  channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, buffer);
  console.log('Message sent to queue:', message);
}
