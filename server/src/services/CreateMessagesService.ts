import { prismaClient } from '../prisma';
import { io } from '../socket';

interface IRequest {
  content: string;
  user_id: string;
}

interface IUser {
  id: string;
  avatar_url: string;
  login: string;
  name: string;
  github_id: number;
}

interface IResponse {
  id: string;
  content: string;
  user_id: string;
  user: IUser;
}

export class CreateMessagesService {
  async run({ content, user_id }: IRequest): Promise<IResponse> {
    const message = await prismaClient.message.create({
      data: {
        content,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const infoWebsocket = {
      content: message.content,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url,
      },
    };

    io.emit('new_message', infoWebsocket);

    return message;
  }
}
