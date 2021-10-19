import { prismaClient } from '../prisma';

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

    return message;
  }
}
