import { Request, Response } from 'express';

import githubConfig from '../config/github';

export class SessionsHandler {
  signIn(request: Request, response: Response): void {
    response.redirect(
      `${githubConfig.auth_url}/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
  }

  callback(request: Request, response: Response): Response {
    const { code } = request.query;
    return response.json({ code });
  }
}
