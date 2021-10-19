import axios from 'axios';

import { sign } from 'jsonwebtoken';

import githubConfig from '../config/github';
import authConfig from '../config/auth';

import { prismaClient } from '../prisma';
import { AuthError } from '../errors/AuthError';

interface IRequest {
  code: string;
}

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

interface User {
  avatar_url: string;
  login: string;
  github_id: number;
  name: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class AuthenticateUserService {
  async run({ code }: IRequest): Promise<IResponse> {
    const url = `${githubConfig.auth_url}/access_token`;

    try {
      const { data: accessTokenResponse } =
        await axios.post<IAccessTokenResponse>(url, null, {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        });

      const response = await axios.get<IUserResponse>(githubConfig.users_url, {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      });

      const { login, id, avatar_url, name } = response.data;

      let user = await prismaClient.user.findFirst({
        where: {
          github_id: id,
        },
      });

      if (!user) {
        user = await prismaClient.user.create({
          data: {
            name,
            avatar_url,
            login,
            github_id: id,
          },
        });
      }

      const token = sign(
        {
          user: {
            name: user.name,
            avatar_url: user.avatar_url,
            id: user.id,
          },
        },
        authConfig.secret,
        {
          subject: user.id,
          expiresIn: '1d',
        },
      );

      return {
        user,
        token,
      };
    } catch (error) {
      throw new AuthError(error.message, 'expired_token');
    }
  }
}
