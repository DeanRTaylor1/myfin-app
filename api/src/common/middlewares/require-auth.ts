import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.currentUser, req.headers, req.session)
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
