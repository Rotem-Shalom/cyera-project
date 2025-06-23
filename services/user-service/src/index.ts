import express from 'express';
import dotenv from 'dotenv';
import { runMigrations } from './db/runMigration';  
import routes from './user.routes';
import { connectRabbitMQ } from './mq/mq.producer';
import { connectToDb } from './db/index';
import { listenToUserCreatedEvents } from './mq/mq.consumer';
import {checkDbConnection, checkRabbitMQ} from './healthcheck.handler'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

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
    await connectRabbitMQ();
    await connectToDb()    
    await runMigrations();  
    await listenToUserCreatedEvents();
    app.listen(PORT, () => {
      console.log(`User service listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
