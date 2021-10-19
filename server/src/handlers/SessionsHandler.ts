import { Request, Response } from 'express';

export class SessionsHandler {
  signIn(request: Request, response: Response): void {
    response.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
  }

  callback(request: Request, response: Response): Response {
    const { code } = request.query;
    return response.json({ code });
  }
}
