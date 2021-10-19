import { Router } from 'express';
import { ProfileUserController } from '../controllers/ProfileUserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const profileUserController = new ProfileUserController();

usersRouter.get('/', ensureAuthenticated, profileUserController.handle);

export { usersRouter };
