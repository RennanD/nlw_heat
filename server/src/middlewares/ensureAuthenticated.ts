import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

import { AuthError } from '../errors/AuthError';

import authConfig from '../config/auth';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AuthError('Token is missing');
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, authConfig.secret) as IPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AuthError('Token expired', 'expired_token');
    }

    throw new AuthError('Invalid token');
  }
}
