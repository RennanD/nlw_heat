import axios from 'axios';

import githubConfig from '../config/github';

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

export class AuthenticateUserService {
  async run({ code }: IRequest): Promise<unknown> {
    const url = `${githubConfig.auth_url}/access_token`;

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

    return response.data;
  }
}
