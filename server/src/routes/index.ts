import { Router } from 'express';
import { messagesRouter } from './messages.routes';
import { sessionsRouter } from './sessions.routes';

const routes = Router();

routes.use('/signin', sessionsRouter);
routes.use('/messages', messagesRouter);

export { routes };
