import { Router } from 'express';
import { SessionsHandler } from '../handlers/SessionsHandler';

const sessionsRouter = Router();

const sessionsHandler = new SessionsHandler();

sessionsRouter.get('/github', sessionsHandler.signIn);

sessionsRouter.get('/callback', sessionsHandler.callback);

export { sessionsRouter };
