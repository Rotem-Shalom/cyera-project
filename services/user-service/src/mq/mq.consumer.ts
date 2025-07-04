import amqp from 'amqplib';
import fs from 'fs';
import path from 'path';

const logFilePath = path.resolve('/app/logs/consumer-events.log');

function logEventToFile(event: any) {
  const logLine = `${new Date().toISOString()} - Received user.created event: ${JSON.stringify(event)}\n`;
  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
}

export async function listenToUserCreatedEvents() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'user.created';
    await channel.assertQueue(queue, { durable: false });

    channel.consume(queue, (msg) => {
      if (msg) {
        const content = msg.content.toString();
        const user = JSON.parse(content);

        console.log('Received user.created event:', user);
        logEventToFile(user);

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Failed to consume user.created event:', error);
  }
}
