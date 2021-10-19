import { Router } from 'express';
import { sessionsRouter } from './sessions.routes';

const routes = Router();

routes.use('/signin', sessionsRouter);

export { routes };
