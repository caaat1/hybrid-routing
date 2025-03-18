// src/middleware/auth/index.ts

import type {Request, Response, NextFunction} from 'express'

declare module 'express-session' {
  interface SessionData {
    user: unknown
  }
}
export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.session.user !== null) {
    next()
    return
  }
  res.redirect('/login')
}
