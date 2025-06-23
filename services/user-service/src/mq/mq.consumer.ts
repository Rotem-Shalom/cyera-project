import amqp from 'amqplib';

export async function ConsumeUserCreatedEvent() {
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

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Failed to consume user.created event:', error);
  }
}
