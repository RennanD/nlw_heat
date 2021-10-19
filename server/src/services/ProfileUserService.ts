import { NotFoundError } from '../errors/NotFoundError';
import { prismaClient } from '../prisma';

interface IRequest {
  user_id: string;
}

interface IResponse {
  id: string;
  avatar_url: string;
  login: string;
  name: string;
  github_id: number;
}

export class ProfileUserService {
  async run({ user_id }: IRequest): Promise<IResponse> {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}
