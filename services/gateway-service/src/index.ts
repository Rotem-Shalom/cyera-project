import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { verifyTokenMiddleware } from './middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(verifyTokenMiddleware);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Gateway Service listening on port ${PORT}`);
});
