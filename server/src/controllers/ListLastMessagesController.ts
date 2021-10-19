import { Request, Response } from 'express';
import { ListLastMessagesService } from '../services/ListLastMessagesService';

export class ListLastMessagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listLastMessages = new ListLastMessagesService();

    const messages = await listLastMessages.run();

    return response.json({ messages });
  }
}
