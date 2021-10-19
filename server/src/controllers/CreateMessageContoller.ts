import { Request, Response } from 'express';
import { CreateMessagesService } from '../services/CreateMessagesService';

export class CreateMessageContoller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { content } = request.body;
    const { user_id } = request;

    const createMessagesService = new CreateMessagesService();

    const message = await createMessagesService.run({
      content,
      user_id,
    });

    return response.status(201).json({ message });
  }
}
