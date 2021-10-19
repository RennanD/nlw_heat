import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { routes } from './routes';
import { handleException } from './middlewares/handleException';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'Hello' });
});

app.use(routes);
app.use(handleException);

export { app };
