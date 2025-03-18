import type {Request, Response, NextFunction} from 'express'

export default abstract class RequestHandler {
  public abstract handle(req: Request, res: Response, next: NextFunction): void
}
