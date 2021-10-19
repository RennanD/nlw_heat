import { prismaClient } from '../prisma';

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

export class ListLastMessagesService {
  async run(): Promise<IResponse[]> {
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
      },
    });

    return messages;
  }
}
