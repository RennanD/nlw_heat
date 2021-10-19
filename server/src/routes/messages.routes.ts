import { Router } from 'express';

import { CreateMessageContoller } from '../controllers/CreateMessageContoller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const messagesRouter = Router();

const createMessagesController = new CreateMessageContoller();

messagesRouter.post('/', ensureAuthenticated, createMessagesController.handle);

export { messagesRouter };
