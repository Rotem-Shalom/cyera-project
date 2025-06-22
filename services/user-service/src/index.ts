import express from 'express';
import dotenv from 'dotenv';
import { runMigrations } from './db/runMigration';  
import routes from './routes';
import { connectRabbitMQ } from './mq/mqProducer';
import { ConsumeUserCreatedEvent } from './mq/mqConsumer';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(routes);

async function start() {
  try {
    await runMigrations();  
    await connectRabbitMQ();
    await ConsumeUserCreatedEvent();
    app.listen(PORT, () => {
      console.log(`User service listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
