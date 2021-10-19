import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { SessionsHandler } from '../handlers/SessionsHandler';

const sessionsRouter = Router();

const sessionsHandler = new SessionsHandler();
const authenticateUserController = new AuthenticateUserController();

sessionsRouter.get('/github', sessionsHandler.signIn);

sessionsRouter.get('/callback', sessionsHandler.callback);

sessionsRouter.post('/authenticate', authenticateUserController.handle);

export { sessionsRouter };
