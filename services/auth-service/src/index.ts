import express from 'express';
import dotenv from 'dotenv';
import authRouter from './auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
