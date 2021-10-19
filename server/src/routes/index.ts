import { Router } from 'express';

import { messagesRouter } from './messages.routes';
import { sessionsRouter } from './sessions.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/signin', sessionsRouter);
routes.use('/messages', messagesRouter);
routes.use('/profile', usersRouter);

export { routes };
