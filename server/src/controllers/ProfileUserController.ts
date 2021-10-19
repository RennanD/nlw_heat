import { Request, Response } from 'express';
import { ProfileUserService } from '../services/ProfileUserService';

export class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const profileUser = new ProfileUserService();

    const { user_id } = request;

    const user = await profileUser.run({ user_id });

    return response.json({ user });
  }
}
