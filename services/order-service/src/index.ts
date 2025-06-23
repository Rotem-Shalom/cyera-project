import express from 'express';
import dotenv from 'dotenv';
import { runMigrations } from './db/runMigration';  
import routes from './orders.routes';
import { connectRabbitMQ } from './mq/mqProducer';
import { ConsumeOrderCreatedEvent } from './mq/mqConsumer';
import {checkDbConnection, checkRabbitMQ} from './healthcheck.handler'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get('/health', async (req, res) => {
  if (await checkDbConnection() && await checkRabbitMQ()) {
    res.status(200).send('OK');
  } else {
    res.status(503).send('Service Unavailable');
  }
});

app.use(routes);

async function start() {
  try {
    await runMigrations();  
    await connectRabbitMQ();
    await ConsumeOrderCreatedEvent(); 
    app.listen(PORT, () => {
      console.log(`Order service listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
