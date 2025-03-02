// src/middleware/auth/index.ts

import type {Request, Response, NextFunction} from 'express'

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (null !== req.session.user) {
    return next()
  }
  return res.redirect('/login')
}
