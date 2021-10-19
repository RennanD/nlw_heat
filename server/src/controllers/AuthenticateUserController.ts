import { Request, Response } from 'express';

import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateUserService = new AuthenticateUserService();

    const { code } = request.body;

    const result = await authenticateUserService.run({
      code,
    });

    return response.send({ result });
  }
}
