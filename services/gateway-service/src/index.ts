import express from 'express';
import dotenv from 'dotenv';
import routes from './gateway.routes';
import { verifyTokenMiddleware } from './gateway.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(verifyTokenMiddleware);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Gateway Service listening on port ${PORT}`);
});
