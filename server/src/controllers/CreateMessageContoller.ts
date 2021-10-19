import { Request, Response } from 'express';

export class CreateMessageContoller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { content } = request.body;
    const { user_id } = request;

    return response.send();
  }
}
