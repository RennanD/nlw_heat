import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import http from 'http';
import cors from 'cors';

import { routes } from './routes';
import { handleException } from './middlewares/handleException';

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
  return response.json({ message: 'Hello' });
});

app.use(routes);
app.use(handleException);

export { httpServer };
