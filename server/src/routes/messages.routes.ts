import { Router } from 'express';

import { CreateMessageContoller } from '../controllers/CreateMessageContoller';
import { ListLastMessagesController } from '../controllers/ListLastMessagesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const messagesRouter = Router();

const createMessagesController = new CreateMessageContoller();
const listLastMessagesController = new ListLastMessagesController();

messagesRouter.get('/', listLastMessagesController.handle);
messagesRouter.post('/', ensureAuthenticated, createMessagesController.handle);

export { messagesRouter };
