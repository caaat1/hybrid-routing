// src/middleware/auth/index.ts

import {Request, Response, NextFunction} from 'express';

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.session.user) {
    return next();
  }
  return res.redirect('/login');
}
