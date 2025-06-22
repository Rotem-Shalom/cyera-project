import amqp from 'amqplib';

export async function ConsumeOrderCreatedEvent() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'order.created';
    await channel.assertQueue(queue, { durable: false });

    channel.consume(queue, (msg) => {
      if (msg) {
        const content = msg.content.toString();
        const user = JSON.parse(content);
        console.log('Received order.created event:', user);

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Failed to consume order.created event:', error);
  }
}
